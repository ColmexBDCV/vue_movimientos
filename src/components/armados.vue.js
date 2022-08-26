export default{
    name: 'armados',
    template: '#mainarmados',
    props: [],
    data() {
        return {
            search: "",
            collection: "todo",
            search_in: "all_fields",
        }
    },
    methods:{
        send_data(){
            //this.$router.push({name:'search', params: {'keyword': this.search}});
            if(this.collection === "todo"){
                this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection);
            }else{
                this.$router.push('/search?keyword=' + this.search + '&filter=' + this.collection + "&search_in=" + this.search_in);
            }
            
        },
        clean_search(){
            this.search = "";
            this.send_data();
        },
        reload(event){
            this.clean_search();
        }
    }
}