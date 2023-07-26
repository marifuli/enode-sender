<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';


const editor = (ClassicEditor)
const ckeditor = CKEditor.component
const editorConfig = {
    language: 'en',
	toolbar: {
		shouldNotGroupWhenFull: true,
		items: [
			// --- Document-wide tools ----------------------------------------------------------------------
			'undo',
			'redo',
			'|',
			'sourceEditing',
			'|',
			'findAndReplace',
			'selectAll',
			'|',

			// --- "Insertables" ----------------------------------------------------------------------------
			'link',
			'insertImage',
			'blockQuote',
			'codeBlock',
			'htmlEmbed',
			'pageBreak',
			'horizontalLine',
			'-',

			// --- Block-level formatting -------------------------------------------------------------------
			'heading',
			'style',
			'|',

			// --- Basic styles, font and inline formatting -------------------------------------------------------
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',

			// --- Text alignment ---------------------------------------------------------------------------
			'alignment',
			'|',

			// --- Lists and indentation --------------------------------------------------------------------
			'bulletedList',
			'numberedList',
			'todoList',
			'|',
			'outdent',
			'indent'
		]
	},
}

const store = useStore()
const is_editor = ref()
//store.state.email_template.body
function upload_attach(event) 
{
    // console.log(event.target.files[0]);
    store.state.attachment = event.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
        store.state.attachment_content = e.target.result;
    };
    reader.readAsText(event.target.files[0])
}

onBeforeMount(() => {
    let domains = store.state.email_addresses.map(e => e.split('@')[1])
    console.log(domains);
    domains.forEach(d => {
        if(!store.state.email_template.url_per_domain[d])
        {
            store.state.email_template.url_per_domain[d] = 'https://' + d
        }
    })
})
;</script>
<template>
    <div>
        <div class="card mt-2">
            <div class="card-body">
                <div class="form-group">
                    <label for="">Subject:</label>
                    <input v-model="store.state.email_template.subject" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">Body:</label>
                    <div class="mt-2">
                        <button class="btn btn-sm" 
                            :class="{'btn-info': !is_editor}" @click="is_editor = false">
                            Source code
                        </button>
                        <button class="btn btn-sm"
                            :class="{'btn-info': is_editor}" @click="is_editor = true"
                        >
                            Editor
                        </button>
                    </div>
                    <div v-if="is_editor">
                        <ckeditor 
                            :editor="editor" 
                            v-model="store.state.email_template.body" 
                            :config="editorConfig"
                        />    
                    </div>
                    <textarea class="form-control" v-else 
                        v-model="store.state.email_template.body" 
                        cols="30" rows="10"></textarea>
                </div>
                <div class="form-group">
                    <label for="check">
                        <input id="check" type="checkbox" v-model="store.state.include_data_in_attachment">
                        Include data in the attachment file.
                    </label>
                </div>
                <div class="form-group">
                    <label for="">
                        Attachment File:
                    </label>
                    <input type="file" class="form-control" 
                        @change="upload_attach">
                    <div class="mt-2" v-if="store.state.attachment_content">
                        <textarea v-html="store.state.attachment_content" class="form-control" readonly rows="10"></textarea>
                    </div>
                </div>
                <hr>
                <div class="form-group" v-if="Object.keys(store.state.email_template.url_per_domain).length">
                    <label class="h5">
                        Login Urls for email domains:
                    </label>
                    <div class="form-group" v-for="(url, d) in store.state.email_template.url_per_domain" :key="d">
                        <label for="">{{ d }}</label>
                        <input type="text" 
                            v-model="store.state.email_template.url_per_domain[d]" class="form-control"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>