import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HistorialService } from 'src/services/historial.service';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, OnChanges {
    public icon = '';
    public ciudad = "";
    public pais = '';
    public busqueda : any = {};
    public descripcion = "";
    public fecha = "";
    public dia =true;
    public imagen ="";
    public tempCelcius = '';
    public tempFareh = '';
    public tempMaxCAyer = '';
    public tempMaxCAntier = '';
    public tempMaxFAyer = '';
    public tempMaxFantier = '';
    public TFchAyer = '';
    public TFchAntier = '';
    public TFchhoy = '';
    public iconayer = '';
    public iconantier = '';
    public estadoclimaayer = '';
    public estadoclimaantier = '';
    public paises: Array<any> =[];
    public ciudades: Array<any> =[];
    public historiales : Array<any>=[];
    //public changes : any ={}



    constructor(private hitorialService : HistorialService) {
      
     }

    ngOnInit(): void {
      this.apiWeather();
      this.apiCountry();
      //this.apiCities(this.pais);
      this.mostrarhistorial();


      console.log(this.busqueda)
    }


    ngOnChanges(changes: SimpleChanges) {
      console.log(changes)
    }

    public tiempo : Array<any> = [];


    async apiWeather(){

      var hoy = new Date() ;
      var nummantier = hoy.getTime() - 1000*60*60*24*2;
      var antier = new Date(nummantier);
      
      
      

      var fechaantier = antier.getFullYear()+'-'+antier.toLocaleDateString(undefined,{month : 'numeric'})+'-'+antier.getDate();
      //var fechaayer =  ayer.getFullYear()+'-'+ayer.toLocaleDateString(undefined,{month : 'numeric'})+'-'+ayer.getDate();
      var fechahoy = hoy.getFullYear()+'-'+hoy.toLocaleDateString(undefined,{month : 'numeric'})+'-'+hoy.getDate();
      //console.log(hoy)
      if(localStorage.getItem('fecha')){
        var localstoragefecha = localStorage.getItem('fecha');
        console.log(localstoragefecha);
        
      }
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/history.json',
        params: {
          q: "Tegucigalpa",
          dt: fechaantier,
          end_dt : fechahoy,
          lang: 'es'
        },
        headers: {
          'X-RapidAPI-Key': 'd58e6dd2dbmshcd1d45beff0bf65p1320efjsn95e8f7ef64e2',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        this.ciudad = response.data.location.name;
        this.descripcion = response.data.forecast.forecastday[2].day.condition.text;
        if(hoy.getHours() >= 18 && hoy.getHours() <= 5)
          this.dia = true;
        else
          this.dia = false;
  
        
        //console.log(hoy.getHours())
        //this.dia =  response.data.forecast.forecastday[2].day.condition
        this.icon  =  response.data.forecast.forecastday[2].day.condition.icon;
        this.selectImage(this.descripcion, this.dia );
        this.tempCelcius = response.data.forecast.forecastday[2].day.avgtemp_c;
        this.tempFareh = response.data.forecast.forecastday[2].day.avgtemp_f;
        this.tempMaxCAyer = response.data.forecast.forecastday[1].day.avgtemp_c;
        this.tempMaxFAyer= response.data.forecast.forecastday[1].day.avgtemp_f;
        this.tempMaxFantier = response.data.forecast.forecastday[0].day.avgtemp_f;
        this.tempMaxCAntier = response.data.forecast.forecastday[0].day.avgtemp_c;
        this.TFchAyer  = response.data.forecast.forecastday[1].date;
        this.TFchAntier  = response.data.forecast.forecastday[0].date;
        this.TFchhoy  = response.data.forecast.forecastday[2].date;
        this.iconantier  = response.data.forecast.forecastday[0].day.condition.icon;
        this.iconayer  = response.data.forecast.forecastday[1].day.condition.icon;
        this.estadoclimaantier  = response.data.forecast.forecastday[0].day.condition.text;
        this.estadoclimaayer  = response.data.forecast.forecastday[1].day.condition.text;



       // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      


    }



    async apiWeatherFind(busqueda: any){
      console.log(busqueda);
      
      var fechaFind = new Date(busqueda.fechaFind);
      console.log(fechaFind)
      var ciudad = busqueda.ciudad;
      var hoy = new Date() ;
      var nummantier = fechaFind.getTime() - 1000*60*60*24*2;
      //var numayer = fechaFind.getTime()- 1000*60*60*24;
      var antier = new Date(nummantier);
      //var ayer = new Date(numayer);

      var fechaantier = antier.getFullYear()+'-'+antier.toLocaleDateString(undefined,{month : 'numeric'})+'-'+antier.getDate();
      //var fechaayer =  ayer.getFullYear()+'-'+ayer.toLocaleDateString(undefined,{month : 'numeric'})+'-'+ayer.getDate();
      var fechahoy = fechaFind.getFullYear()+'-'+fechaFind.toLocaleDateString(undefined,{month : 'numeric'})+'-'+fechaFind.getDate();
      //console.log(fechaFind)

      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/history.json',
        params: {
          q: ciudad,
          dt: fechaantier,
          end_dt : fechahoy,
          lang: 'es'
        },
        headers: {
          'X-RapidAPI-Key': 'd58e6dd2dbmshcd1d45beff0bf65p1320efjsn95e8f7ef64e2',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        this.ciudad = response.data.location.name;
        this.descripcion = response.data.forecast.forecastday[2].day.condition.text;
        if(hoy.getHours() >= 18 && hoy.getHours() <= 5)
          this.dia = true;
        else
          this.dia = false;
  
        
        //console.log(hoy.getHours())
        //this.dia =  response.data.forecast.forecastday[2].day.condition
        this.icon  =  response.data.forecast.forecastday[2].day.condition.icon;
        
        this.tempCelcius = response.data.forecast.forecastday[2].day.avgtemp_c;
        this.tempFareh = response.data.forecast.forecastday[2].day.avgtemp_f;
        this.tempMaxCAyer = response.data.forecast.forecastday[1].day.avgtemp_c;
        this.tempMaxFAyer= response.data.forecast.forecastday[1].day.avgtemp_f;
        this.tempMaxFantier = response.data.forecast.forecastday[0].day.avgtemp_f;
        this.tempMaxCAntier = response.data.forecast.forecastday[0].day.avgtemp_c;
        this.TFchAyer  = response.data.forecast.forecastday[1].date;
        this.TFchAntier  = response.data.forecast.forecastday[0].date;
        this.TFchhoy  = response.data.forecast.forecastday[2].date;
        this.iconantier  = response.data.forecast.forecastday[0].day.condition.icon;
        this.iconayer  = response.data.forecast.forecastday[1].day.condition.icon;
        this.estadoclimaantier  = response.data.forecast.forecastday[0].day.condition.text;
        this.estadoclimaayer  = response.data.forecast.forecastday[1].day.condition.text;
        var data = {
          pais : busqueda.pais, 
          ciudad : busqueda.ciudad,
          fecha : busqueda.fechaFind,
          estadoclima : this.descripcion, 
          temperatura : this.tempCelcius+' º grados Celcius'
        }
        this.selectImage(this.descripcion, this.dia );
        this.agregarHistorial(data);

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    

    }

    async apiCountry(){
      const apiUrl = 'https://restcountries.com/v3.1/all';


      try {
        const response = await axios.get(apiUrl);
        const countries = response.data;
        //console.log(countries);
        for(let i = 0 ; i<countries.length; i++){
          var infopais = { nombre : countries[i].name.common, codigo : countries[i].altSpellings[0]};
          this.paises.push(infopais);

        }
        //console.log(this.paises)
      
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
              

     
    }

    async apiCities(pais :any){
      if(pais == '')
      pais = 'HN'
      const options = {
        method: 'GET',
        url: `https://geoapi13.p.rapidapi.com/v1/country/${pais}/city/list`,
        params: {
          
          
        },
        headers: {
          'X-RapidAPI-Key': 'd58e6dd2dbmshcd1d45beff0bf65p1320efjsn95e8f7ef64e2',
          'X-RapidAPI-Host': 'geoapi13.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        var ciudadesData  = response.data.cities;
        //console.log(ciudadesData);
        for(let i = 0; i<ciudadesData.length; i++ ){
          this.ciudades.push({nombre : ciudadesData[i].name});
        }
        //console.log(this.ciudades)
        
      } catch (error) {
        console.error(error);
      }
    

     
    }


    async selectImage(descripcion:any, dia:any){
      if(descripcion == 'Soleado'){
        this.imagen = '../../assets/imagenes/soleado.png';
      }else if(descripcion =='Despejado'){
        this.imagen = '../../assets/imagenes/despejado-noche.png';
      }else if(descripcion == 'Parcialmente nublado' && dia){
        this.imagen = '../../assets/imagenes/parcialmente-nublado.png'
      }else if(descripcion == 'Parcialmente nublado' && !dia){
        this.imagen = '../../assets/imagenes/nublado-noche.png';
      }else if(descripcion == 'Nublado' || descripcion == 'Cielo cubierto' || descripcion == 'Neblina' || descripcion == 'Niebla moderada' || descripcion == 'Niebla helada'){
        this.imagen = '../../assets/imagenes/nublado.png';
      }else if(descripcion == 'Lluvia  moderada a intervalos' || descripcion == 'Llovizna a intervalos' || 
      descripcion == 'Llovizna' || descripcion == 'Llovizna helada' || descripcion =='Fuerte llovizna helada' || descripcion == 'Lluvias ligeras a intervalos' 
      || descripcion == 'Ligeras lluvias' || descripcion  == 'Periodos de lluvia moderada' || descripcion == 'Lluvia moderada' || descripcion == 'Periodos de fuertes lluvias' 
      || descripcion == 'Fuertes lluvias' || descripcion == 'Ligeras lluvias heladas' || descripcion == 'Lluvias heladas fuertes o moderadas' || descripcion == 'Ligeras precipitaciones'
      || descripcion == 'Lluvias fuertes o moderadas' || descripcion == 'Lluvias torrenciales' || descripcion == 'Intervalos de lluvias ligeras con tomenta en la región'){
        this.imagen = '../../assets/imagenes/lluvia.png';
      }else if(descripcion == 'Nieve moderada a intervalos en las aproximaciones' || descripcion == 'Aguanieve moderada a intervalos en las aproximaciones' || descripcion == 'Chubascos de nieve' 
      || descripcion =='Ligeras precipitaciones de aguanieve' || descripcion == 'Aguanieve fuerte o moderada'
      || descripcion == 'Nevadas ligeras a intervalos' || descripcion == 'Nevadas ligeras' || descripcion == 'Nieve moderada a intervalos' || descripcion == 'Nieve moderada' 
      || descripcion == 'Nevadas intensas' || descripcion == 'Fuertes nevadas' || descripcion == 'Ligeros chubascos de aguanieve' 
      || descripcion == 'Chubascos de aguanieve fuertes o moderados' || descripcion == 'Ligeras precipitaciones de nieve' || descripcion == 'Chubascos de nieve fuertes o moderados'
       ) {
        this.imagen = '../../assets/imagenes/nieve.png';
      }else if(descripcion == 'Llovizna helada a intervalos en las aproximaciones' || descripcion == 'Granizo' || descripcion == 'Ligeros chubascos acompañados de granizo'
      || descripcion == 'Chubascos fuertes o moderados acompañados de granizo'){
        this.imagen = '../../assets/imagenes/granizo.png';
      }else if(descripcion == 'Cielos tormentosos en las aproximaciones'){
        this.imagen = '../../assets/imagenes/rayos.png'
      }else if (descripcion == 'Ventisca'){
        this.imagen = '../../assets/imagenes/vientos-fuertes.png';
      }else if(descripcion =='Lluvias con tormenta fuertes o moderadas en la región'  || descripcion == 'Nieve moderada o fuertes nevadas con tormenta en la región'){
        this.imagen = '../../assets/imagenes/tormenta-electrica.png'
      }

    }



    agregarHistorial (datos : any){
      this.hitorialService.crearHistorial(datos).subscribe((res)=>{
        this.mostrarhistorial();
      })

    }

    mostrarhistorial (){
      this.hitorialService.getHistorial().subscribe((res)=>{
        this.historiales= res[0];
        console.log(this.historiales)
      });
      
    }

    eliminarhistorial(){
      this.hitorialService.eliminarhistorial().subscribe((res)=>{
        this.mostrarhistorial();
      })
    }

}
