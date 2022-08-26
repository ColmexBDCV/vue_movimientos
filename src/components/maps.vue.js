export default{
    name: 'maps',
    template: '<div class="container">' +
        '<h2>Test de Mapas</h2>' +
        '<div id="map" style="height: 500px;">' +
        '</div>' +
    '</div>', 
    data() {
        return {
            maps: null,
            //18.854234053791064, -98.94548192051907
            mapCenter: {lat: 18.854234053791064, lng: -98.94548192051907},
            search_in: "all_fields",
        }
    },
    methods:{
        init_map(){
            this.maps = new google.maps.Map(document.getElementById('map'), {
                center: this.mapCenter,
                zoom: 7,
                maxZoom: 20,
                minZoom: 3,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: true,
                zoomControl: true
            })
        },
        set_marker(point,label){
            const markers = new google.maps.Marker({
                position: point,
                map: this.maps
            })
        }
    },
    mounted(){
        this.init_map();
        this.set_marker({lat: 18.854234053791064, lng: -98.94548192051907}, "A");
        this.set_marker({lat: 16.7918475, lng: -98.2420878}, "A");
        this.set_marker({lat: 16.6521899, lng: -98.0903634}, "A");
        this.set_marker({lat: 19.8735055, lng: -97.5887976}, "A");
    },
    computed:{

    }
}