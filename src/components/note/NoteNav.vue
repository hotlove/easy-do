<template>
    <div class="note-home-nav-content">
        <!-- 导航搜索 -->
        <div class="nav-search">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchFile"></el-input>
        </div>

        <!-- 任务列表 -->
        <div class="note-home-nav-file">
            <div class="note-file-title" style="cursor: pointer" @click="showTree = !showTree">
                <span class="nav-font" @contextmenu.prevent.stop="contextClick($event, null, defaultNoteFile)">
                    <i :class="showTree ? 'el-icon-folder-opened' : 'el-icon-folder' " style="font-size: 14px; margin-right: 3px"></i>
                    {{defaultNoteFile.name}}
                </span>
            </div>
            <el-collapse-transition>
                <div v-if="showTree">
                    <el-tree ref="fileTreeNode"
                             :filter-node-method="filterNode"
                             :data="treeData"
                             :props="treeProps"
                             :expand-on-click-node="false">
                        <div class="custom-tree-node"  slot-scope="{ node, data }">
                            <div v-if="!node.data.isEdit">
                                <div v-if="data.type === '1'" class="nav-font" @contextmenu.prevent.stop="contextClick($event, node, data)">
                                    {{ node.label }}
                                </div>
                                <div v-if="data.type === '2'" class="nav-font" @contextmenu.prevent.stop="contextClick($event, node, data)" @click="goFileInfo(data)">
                                    {{ node.label }}
                                </div>
                            </div>
                            <div v-if="node.data.isEdit" class="note-nav-update">
                                <el-input :ref="'editRef-'+ data.code " v-model="data.name" @keyup.enter.native="updateNoteFile(node, data)"></el-input>
                            </div>
                        </div>
                    </el-tree>
                </div>
            </el-collapse-transition>

            <!-- 右击菜单 -->
            <div v-if="menuVisible" :style="positionStyle" class="context-class">
                <ul class="menu">
                    <li v-if="currentNoteFile.type !== '2'" class="menu-item" @click.prevent.stop="createNewFile('2')">
                        <i class="el-icon-document" style="font-size: 15px;margin-right: 5px"></i>
                        <span>新建笔记</span>
                    </li>
                    <li v-if="currentNoteFile.type !== '2'" class="menu-item" @click.prevent.stop="createNewFile('1')">
                        <i class="el-icon-folder-remove" style="font-size: 15px; margin-right: 5px"></i>
                        <span>新建文件夹</span>
                    </li>
                    <li class="menu-item" v-if="currentNoteFile.code !== '0'" @click.prevent.stop="delNoteFile">
                        <i class="el-icon-delete" style="font-size: 15px; margin-right: 5px"></i>
                        <span>删除</span>
                    </li>
                    <li class="menu-item"  v-if="currentNoteFile.code !== '0'" @click.prevent.stop="updateNode">
                        <i class="el-icon-edit" style="font-size: 15px; margin-right: 5px"></i>
                        <span>重命名</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import AddTask from '@/components/taskandtodo/AddTask.vue';
    import {NeDBExample} from '@/dbutil/nedbutil/NeDBExample';
    import {NoteFile, NoteFileProperty} from "@/domain/NoteFile";
    import {noteFileMapper} from "@/dbutil";
    import {CommonUtil} from "@/common/CommonUtil";
    import {ElTree} from "element-ui/types/tree";
    import Note from "@/views/note/Note.vue";

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
        private fileType: string = '1'; // 文件类型

        // 树结构
        private treeData: any = [];

        // 树基础配置
        private treeProps: any = {
            children: 'children',
            label: 'name'
        };

        public mounted(): void {
            // let neDBExample = new NeDBExample();
            // noteFileMapper.delete(neDBExample);
            this.getAllFile();
        }

        @Watch("searchFile")
        public searchFileMonitor(val: any) {
            (this.$refs['fileTreeNode'] as ElTree<NoteFile, any>).filter(val);
        }

        // 计算属性 获取定位信息
        get positionStyle(): any {
            return {
                'left': this.leftp + 'px',
                'top': this.toptp + 'px'
            }
        }

        // 过滤节点文件
        public filterNode(value: any, data: any): boolean {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        }

        // 获取全部数据
        public getAllFile(): void {
            let neDBExample = new NeDBExample();

            noteFileMapper.find(neDBExample).then((noteFileList: any) => {
                if (CommonUtil.collectionNotEmpty(noteFileList)) {
                    this.setTreeData(noteFileList);
                    this.showTree = true;
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
                item.isEdit = false;
                let childs = allNodeList.filter((e: any) => e.parentCode == item.code);
                if (CommonUtil.collectionNotEmpty(childs)) {
                    item.children = childs;
                    this.recursion(childs, allNodeList)
                }
            })
        }

        // 确认文件创建
        public confirmAddFile(): void {
            // 默认展开父节点
            this.currentNode.expanded = true;
            // 添加节点
            this.addNoteFile();
        }

        // 新增文件
        public addNoteFile(): void {
            let noteFile: any = {
                id: 0,
                code: CommonUtil.getUUID(),
                parentCode: this.currentNoteFile.code,
                name: this.fileType === '1' ? '新建文件夹' : '新建文件',
                type: this.fileType,
                content: '',
                createdDate: new Date(),
                updateDate: new Date(0)
            };

            noteFileMapper.insert(noteFile).then((result: any) => {
                console.log(result)
                // 设置默认添加的为可编辑
                noteFile.isEdit = true;

                if (this.currentNoteFile.code == '0') {
                    this.treeData.push(noteFile);
                    this.showTree = true;
                } else {
                    if(this.currentNoteFile.hasOwnProperty('children')) {
                        this.currentNoteFile.children.push(noteFile);
                        (this.$refs['fileTreeNode'] as ElTree<NoteFile, any>).append(noteFile, this.currentNode);
                    } else {
                        (this.$refs['fileTreeNode'] as ElTree<NoteFile, any>).append(noteFile, this.currentNode);
                    }
                    // (this.$refs['fileTreeNode'] as any).append(noteFile, this.currentNoteFile);
                }

                // 如果是新建得是文件
                if (noteFile.type === '2') {
                    this.$router.push({name: 'note-create', params: {'code': noteFile.code}}).catch((err: Error) => err);
                }
            });
        }

        // 查看文件详情
        public goFileInfo(data: NoteFile): void {
            this.$router.push({name: 'note-create', params: {'code': data.code}}).catch((err: Error) => err);
        }

        // 删除文件
        public delNoteFile(): void {

            let deleteCode: string[] = [];

            deleteCode.push(this.currentNoteFile.code);
            if (this.currentNoteFile.hasOwnProperty('children')
                && CommonUtil.collectionNotEmpty(this.currentNoteFile.children)) {
                this.recursionFindDeleteCode(deleteCode, this.currentNoteFile.children)
            }

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

        // 选择修改文件
        public updateNode(): void {
            this.currentNoteFile.isEdit = true;
            this.$nextTick(() => {
                (this.$refs['editRef-' + this.currentNoteFile.code] as any).focus();
                let elementsByClassName = document.getElementsByClassName('el-tree-node__content');
                elementsByClassName[0].setAttribute('style','background: #D2E2FF');
            });
            this.menuVisible = false;
            document.addEventListener('click', this.cancelEidt);
        }

        public cancelEidt(): void {
            // 取消鼠标监听事件 菜单栏
            this.currentNoteFile.isEdit = false;
            // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
            document.removeEventListener('click', this.cancelEidt);
        }

        // 修改文件
        public updateNoteFile(node: any, noteFile: NoteFile): void {

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(NoteFileProperty.name, noteFile.name)
                .eq(NoteFileProperty.type, this.fileType)
                .eq(NoteFileProperty.parentCode, noteFile.parentCode);
            // 修改前判断该父目录下是否存在同名超过两个得
            noteFileMapper.find(neDBExample).then((noteFileList: any) => {
                if (CommonUtil.collectionNotEmpty(noteFileList) && noteFileList.length > 1) {
                    this.$notify({
                        type: 'warning',
                        duration: 1500,
                        title: this.fileType === '1' ? '新建目录提醒' : '新建文件提醒',
                        message: this.fileType === '1' ? '该文目录已存在' : '该文件已存在',
                        customClass: 'edo-notify-class',
                    });
                } else {
                    let updateNeDBExample = new NeDBExample();
                    updateNeDBExample.createCriteria().eq(NoteFileProperty.code, noteFile.code);

                    let updateRecord: NoteFile = {
                        id: 0,
                        code: noteFile.code,
                        parentCode: noteFile.parentCode,
                        name: noteFile.name,
                        type: noteFile.type,
                        content: noteFile.content,
                        createdDate: noteFile.createdDate,
                        updateDate: noteFile.updateDate,
                    };
                    noteFileMapper.update(updateNeDBExample, updateRecord).then((affectRows: any) => {
                        if (affectRows > 0) {
                            // 修改成功
                            node.data.isEdit = false;
                        }
                    })
                }
            });
        }

        // 创建文件
        public createNewFile(fileType: string): void {
            this.menuVisible = false;
            this.fileType = fileType; // 创建的是文件
            this.confirmAddFile();
        }

        // 鼠标右击事件
        public contextClick(event: MouseEvent, node: any, noteFile: any): void { // 鼠标右击触发事件
            if (this.currentNoteFile.hasOwnProperty('isEdit')) {
                this.currentNoteFile.isEdit = false;
            }

            // 展示右键菜单
            this.showContext(event);

            this.currentNoteFile = noteFile;
            if (node !== null) {
                this.currentNode = node;
            }
        }

        // 展示右击菜单
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
                border-radius: 0;
            }

            .el-input__icon {
                line-height: 30px;
            }
        }

        /*文件夹列表*/
        .note-home-nav-file {
            height: calc(100vh - 60px);
            padding-top: 10px;

            /*div.is-current {*/
            /*    background: #D2E2FF;*/
            /*}*/

            .nav-font {
                font-size: 12px;
                color: #000000;
            }

            .custom-tree-node {
                width: 100%;

                .el-input__inner {
                    border: none;
                    border-radius: 0;
                    padding: 0;
                    height: 25px;
                    line-height: 25px;
                    width: 80%;
                }
            }

            .el-tree-node__content {
                height: 30px;
                line-height: 30px;

                &:hover {
                    background: #E8F0FF;
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
