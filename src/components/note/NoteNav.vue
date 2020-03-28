<template>
    <div class="note-home-nav-content">
        <!-- 导航搜索 -->
        <div class="nav-search">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchFile"></el-input>
        </div>

        <!-- 任务列表 -->
        <div class="note-home-nav-file">
            <div class="note-file-title" style="cursor: pointer" @click="showTree = !showTree">
                <span @contextmenu.prevent.stop="contextClick($event, defaultNoteFile)">
                    <i :class="showTree ? 'el-icon-folder-opened' : 'el-icon-folder' " style="margin-right: 3px"></i>
                    {{defaultNoteFile.name}}
                </span>
            </div>
            <el-collapse-transition>
                <div v-if="showTree">
                    <el-tree ref="fileTreeNode" :data="treeData" :props="treeProps">
                        <div class="custom-tree-node"  slot-scope="{ node, data }">
                            <div v-if="data.type === '1'" @contextmenu.prevent.stop="contextClick($event, node, data)">
<!--                                <i class="el-icon-folder"></i>-->
                                {{ node.label }}
                            </div>
                            <div v-if="data.type === '2'">
<!--                                <i class="el-icon-document"></i>-->
                                {{ node.label }}
                            </div>
                        </div>
                    </el-tree>
                </div>
            </el-collapse-transition>

            <!-- 属性文件结构 -->
            <div v-if="menuVisible" :style="positionStyle" class="context-class">
                <ul class="menu">
                    <li class="menu-item" @click.prevent.stop="createNewFile">
                        <i class="el-icon-document" style="font-size: 15px;margin-right: 5px"></i>
                        <span>新建笔记</span>
                    </li>
                    <li class="menu-item" @click.prevent.stop="createNewDir">
                        <i class="el-icon-folder-remove" style="font-size: 15px; margin-right: 5px"></i>
                        <span>新建文件夹</span>
                    </li>
                    <li class="menu-item" v-if="currentNoteFile.code !== '0'" @click.prevent.stop="delNoteFile">
                        <i class="el-icon-delete" style="font-size: 15px; margin-right: 5px"></i>
                        <span>删除</span>
                    </li>
                    <li class="menu-item"  v-if="currentNoteFile.code !== '0'" @click.prevent.stop="updateNoteFile">
                        <i class="el-icon-edit" style="font-size: 15px; margin-right: 5px"></i>
                        <span>修改</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 添加 -->
        <mu-dialog width="35%"
                   transition="fade"
                   :overlay="false"
                   :overlay-close="false"
                   :esc-press-close="false"
                   :open.sync="showAddFile">
            <div class="file-add" style="font-size: 12px;">
                <el-input v-model="createFileName" :placeholder="fileType === '1' ? '文件夹名称' : '文件名称'"></el-input>
            </div>
            <div slot="actions" style="padding: 0 16px">
                <el-button size="mini" type="text" @click="cancelFile">取消</el-button>
                <el-button size="mini" type="text" @click="confirmAddFile">添加</el-button>
            </div>
        </mu-dialog>

    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AddTask from '@/components/taskandtodo/AddTask.vue';
    import {Task, TaskProperty} from '@/domain/Task';
    import {NeDBExample} from '@/dbutil/nedbutil/NeDBExample';
    import {taskMapper} from '@/dbutil/TaskMapper';
    import {NoteFile, NoteFileProperty} from "@/domain/NoteFile";
    import {noteFileMapper, todoItemMapper} from "@/dbutil";
    import {CommonUtil} from "@/common/CommonUtil";
    import {TodoItemEdiable, TodoItemProperty} from "@/domain/TodoItem";
    import {ElTree, TreeData, TreeNode} from "element-ui/types/tree";
    import {treeNode} from "element-ui/types/table";

    @Component({
        components: {
            AddTask,
        },
    })
    export default class TodoNavigationNew extends Vue {
        private showTree: boolean = false; // 展示文件树
        private menuVisible: boolean = false; // 展示文件树
        private searchFile: string = ""; // 搜索文件

        // 定位信息
        private leftp: number = 80;
        private toptp: number = 80;

        private showAddFile: boolean = false;

        // 默认值
        private defaultNoteFile: NoteFile = {
            id: 0,
            code: '0',
            parentCode: '0',
            name: '我的文件夹',
            type: '1',
            content: '',
            createdDate: new Date(0),
            updateDate: new Date(0),
        };

        // 当前选择的文件对象
        private currentNoteFile: any = {};
        private currentNode: any = {};
        private createFileName: string = ""; // 创建文件名称
        private fileType: string = '1'; // 文件类型

        // 树结构
        private treeData: any = [];

        private treeProps: any = {
            children: 'children',
            label: 'name'
        };

        public mounted(): void {
            this.getAllFile();
        }

        public getAllFile(): void {
            let neDBExample = new NeDBExample();

            noteFileMapper.find(neDBExample).then((noteFileList: any) => {
                console.log(noteFileList)
                if (CommonUtil.collectionNotEmpty(noteFileList)) {
                    this.setTreeData(noteFileList)
                }
            });
        }

        // 配置树结构
        public setTreeData(fileList: any) {

            let firsetLevelNodes = fileList.filter((e: any) => e.parentCode == "0");

            this.recursion(firsetLevelNodes, fileList);

            this.treeData = firsetLevelNodes;
        }

        // 递归填充树结构
        public recursion(levelList: any, allNodeList: any) {
            levelList.forEach((item: any) => {
                let childs = allNodeList.filter((e: any) => e.parentCode == item.code);
                if (CommonUtil.collectionNotEmpty(childs)) {
                    item.children = childs;
                    item.isEdit = false;
                    this.recursion(childs, allNodeList)
                }
            })
        }


        // 取消文件创建
        public cancelFile(): void {
            this.showAddFile = false;
        }

        // 确认文件创建
        public confirmAddFile(): void {

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(NoteFileProperty.name, this.createFileName).eq(NoteFileProperty.type, this.fileType);

            noteFileMapper.find(neDBExample).then((noteFileList: any) => {
                if (!CommonUtil.collectionNotEmpty(noteFileList)) {
                    this.addNoteFile();
                } else {
                    // todo 如果文件或者文件存在进行判断提示
                }
            });
        }

        // 新增文件
        public addNoteFile(): void {
            let noteFile: NoteFile = {
                id: 0,
                code: CommonUtil.getUUID(),
                parentCode: this.currentNoteFile.code,
                name: this.createFileName,
                type: this.fileType,
                content: '',
                createdDate: new Date(),
                updateDate: new Date(0)
            };

            noteFileMapper.insert(noteFile).then((result: any) => {

                if (this.currentNoteFile.code == '0') {
                    this.treeData.push(noteFile);
                    this.showTree = true;
                } else {
                    if(this.currentNoteFile.hasOwnProperty('children')) {
                        this.currentNoteFile.children.push(noteFile);
                        (this.$refs['fileTreeNode'] as ElTree<NoteFile, any>).append(noteFile, this.currentNode);
                    } else {
                        // this.currentNoteFile.children = [];
                        // this.currentNoteFile.children.push(noteFile);
                        (this.$refs['fileTreeNode'] as ElTree<NoteFile, any>).append(noteFile, this.currentNode);
                    }
                    // (this.$refs['fileTreeNode'] as any).append(noteFile, this.currentNoteFile);
                    // this.$refs['fileTreeNode'].append(newNode, this.operTreeNode);
                }

                this.showAddFile = false;
            });
        }

        // 删除文件
        public delNoteFile(): void {

            let deleteCode: string[] = [];

            deleteCode.push(this.currentNoteFile.code);
            if (this.currentNoteFile.hasOwnProperty('children')
                && CommonUtil.collectionNotEmpty(this.currentNoteFile.children)) {
                this.recursionFindDeleteCode(deleteCode, this.currentNoteFile.children)
            }

            console.log(deleteCode);

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().in(NoteFileProperty.code, deleteCode);
            noteFileMapper.delete(neDBExample).then((affectRows: any) => {
                if (affectRows > 0) {
                    this.menuVisible = false;
                    (this.$refs['fileTreeNode'] as ElTree<NoteFile, any>).remove(this.currentNode);
                }
            })
        }

        // 递归寻找需要删除的code
        public recursionFindDeleteCode(deleteCodes: string[], nodes: any): void {
            nodes.forEach((item: any) => {
                deleteCodes.push(item.code);
                if (item.hasOwnProperty('children') && CommonUtil.collectionNotEmpty(item.children)) {
                    this.recursionFindDeleteCode(deleteCodes, item.children)
                }
            })
        }


        // 修改文件
        public updateNoteFile(): void {

        }

        // 创建文件
        public createNewFile(): void {
            this.showAddFile = true;
            this.menuVisible = false;
            this.fileType = "2"; // 创建的是文件
        }

        // 创建文件
        public createNewDir(): void {
            this.showAddFile = true;
            this.menuVisible = false;
            this.fileType = "1"; // 创建的是目录
        }

        // 计算属性 获取定位信息
        get positionStyle(): any {
            return {
                'left': this.leftp + 'px',
                'top': this.toptp + 'px'
            }
        }

        // 鼠标右击事件
        public contextClick(event: MouseEvent, node: any, noteFile: NoteFile): void { // 鼠标右击触发事件
            // 展示右键菜单
            this.showContext(event);

            this.currentNoteFile = noteFile;
            this.currentNode = node;
        }

        // 展示邮件菜单
        public showContext(event: MouseEvent): void {
            // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = false;

            // 显示模态窗口，跳出自定义菜单栏
            this.menuVisible = true;

            this.leftp = event.clientX - 60;
            this.toptp = event.clientY;

            // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
            document.addEventListener('click', this.cancelCotext);
        }

        // 取消事件绑定
        public cancelCotext(): void {
            // 取消鼠标监听事件 菜单栏
            this.menuVisible = false;
            // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
            document.removeEventListener('click', this.cancelCotext);
        }
    }
</script>
<style lang="scss">
    .note-home-nav-content {
        padding: 0 5px;
        height: calc(100vh - 25px);

        /*文件搜索框*/
        .nav-search {
            .el-input__inner {
                height: 30px;
                line-height: 30px;
            }

            .el-input__icon {
                line-height: 30px;
            }
        }

        /*文件夹列表*/
        .note-home-nav-file {
            height: calc(100vh - 60px);
            padding-top: 10px;

            .custom-tree-node {
                width: 100%;
            }

            .el-tree-node__content {
                height: 30px;
                line-height: 30px;

                &:hover {
                    background: #D2E2FF;
                }
            }
        }
    }

    .context-class {
        position: absolute;
        width: 150px;

        box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, .1);
        text-align: left;
        color: #2c3e50;
        background: #fff;
        z-index: 999;

        .menu {
            list-style: none;
            padding: 0;
            margin: 0;

            .menu-item {
                padding: 0 10px;
                cursor: pointer;
                height: 35px;
                line-height: 35px;

                &:hover {
                    background: #e0ecfa;
                }
            }

        }
    }

    .file-add {
        .el-input__inner {
            border-radius: unset;
        }
    }

</style>
