declare module 'le-markdown-editor' {
    import leMarkdownEditor from 'le-markdown-editor'
    import { Component } from "vue";
    export interface LeMarkdownEditor {
        install: (Vue: any) => any;
    }
}

