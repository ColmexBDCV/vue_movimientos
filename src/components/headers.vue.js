export default{
    name: 'headers',
    template: '#headers',
    props: ['keyword', 'pages', 'search_in', 'filter', 'is_page'],
    data() {
        return {
            search: "",
            lcl_keyword: this.keyword,
            lcl_search: this.search_in,
            lcl_filter: this.filter
        }
    },
    methods: {
        search_term() {
            var val = this.search;
            this.tmp_keyword = val;
            var params = this.$store.getters['principal/url'].split("?");
            var urlParams = new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]);

            if (val != "") {
                if(this.lcl_search != "todo" & this.lcl_search != undefined){
                    urlParams.append(this.search_in,val);
                    urlParams.append("op","AND");
                    urlParams.append("search_field","advanced");
                    urlParams.append("commit","Buscar");
                    this.lcl_search = "todo";
                    this.lcl_keyword = "";
                }else{
                    urlParams.delete('op');
                    urlParams.delete(this.search_in);
                    urlParams.delete('commit');
                    urlParams.delete('search_field');
                    if(urlParams.has('q')){
                        //urlParams.set('search_field', 'all_fields');
                        urlParams.set('q', val);
                        urlParams.append('search_field', 'all_fields');
                    } 
                    else {
                        urlParams.append('q',val);
                        urlParams.append('search_field', 'all_fields');
                    }
                }                
                this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
                this.$store.dispatch('pages/next_page', 1);
            }else {
                urlParams.delete('op');
                urlParams.delete(this.search_in);
                urlParams.delete('commit');
                urlParams.delete('search_field');
                urlParams.delete('q');
				this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
                //this.$router.push({ path: '/search' });
			}        
            
            this.$store.dispatch('principal/get_data');
            //this.$router.push({ path: '/search' });
		},
        clean_search(){
            this.search = "";
            this.search_term();
        },
        get_search(){
            if(this.is_page === 'true'){
                this.$router.push('/search?keyword=' + this.search + '&filter=todo');
            }else{
                this.search_term();
            }
        },
        reload(event){
            this.clean_search();
        }

    },
    mounted(){
        if(this.lcl_keyword){
            this.search = this.keyword;
            this.search_term();
        }

        if(this.keyword == ''){
            this.search = this.keyword;
            this.search_term();
        }
    }
}