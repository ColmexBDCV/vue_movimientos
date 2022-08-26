import models from './utils/models.js'
import headers from './components/headers.vue.js'
import {article_filter,openPDF, read_pdfid, newCopyClipboard} from '../functions.js'

export default{
    name: 'Doc',
    template: '#docview',
    props: ['id','has_model', 'thumbnail', 'related', 'keyword'],
    data: function(){
        return {
            url_doc: this.$store.getters['principal/base_url']+'concern/',
            url_file: this.$store.getters['principal/base_url']+'concern/',
            doc: '',
            doc_prop: '',
            tmp_url: '',
            pdf_active: this.related != undefined ? true: false,
            url_share: this.$store.getters['principal/share_url'] + '?id=' + this.id + '&has_model=' + this.has_model + '&thumbnail=' + this.thumbnail + '&related=' + this.related,
        }
    },
	components: {
        'headers': headers,
	},
	watch: {
        doc(){
            return this.doc;
        },
        doc_prop(){
            return this.doc_prop;
        }
	},
	created: function () {
        //alert(this.has_model);
        this.url_file = this.url_file + 'parent/' + this.id + '/file_sets/' + this.related + '.json';
        this.url_doc = this.url_doc + models.types[this.has_model] + '/' + this.id + '.json';
        this.get_data();
    },
    /*mounted: function () {
        this.$nextTick(function () {
            alert();
            openPDF(this.related);
        })
    },*/
	methods: {
        async get_data() {
            await axios.get(this.url_doc)
                .then(response => {
                    this.doc = response.data
            }),
            await axios.get(this.url_file)
                .then(response => {
                    this.doc_prop = response.data
            })
        },
        filter_key(metadata, key){
            if(!article_filter(key))
                return false;

            if (typeof metadata == "object")
                if (metadata == null || metadata.length < 1) {
                    return false
                }

            if (typeof metadata === "string")
                if (metadata == "") {
                    return false
                }


            return true
            
        },
        split_content(m){
            var contents = m.split("--");
            return contents;
        },
        get_url(){
            return this.$store.getters['principal/base_url']
        },
        get_share_url(){
            this.tmp_url = this.url_share.replace("&", "%26");
            return this.tmp_url.replace("#", "%23");
        },
        read_idpdf(){
            read_pdfid();
        },
        copyClipboard () {
            newCopyClipboard();
          },
	},
}