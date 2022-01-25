
window.addEventListener('load', ()=> { //sera ejecutado cuando carguen los elementos

    let lon //longitude
    let lat //latitude
    let city = 'bogota'



    let temperaturaValor = document.getElementById('temp_value');
    let temperaturaDescripcion = document.getElementById('temp_desc');


    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icon_animated');

    let vientoVelocidad = document.getElementById('viento_velocidad');


    if(navigator.geolocation){ //si el objeto existe los servicios de geolocalizacion estaran disponibles

        //codigo para mostrar ubicacion en tiempo real *************************************************
        navigator.geolocation.getCurrentPosition(posicion => {

            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            //ubicaion por coordenadas
            //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=52f7bec7dc33b634c3c12ae6b41c50a1`

            //ubicacion por ciudad
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=52f7bec7dc33b634c3c12ae6b41c50a1`


            console.log(url);

            fetch(url)

                .then(response => { return response.json() }) //llamamos la informacion en formato json

                .then(data => {

                    //console.log(data.main)//mostramos la informacion

                    let temp = Math.round(data.main.temp) //con math.round redondeamos el valor ya que es un float y queda en un entero
                    temperaturaValor.textContent = `${temp} °C`;

                    //accedemos al array que contiene la descripcion
                    let desc = data.weather[0].description 
                    temperaturaDescripcion.textContent = desc.toUpperCase(); //mostramos en pantalla el valor de la variable en mayus

                    //traemos la ubicacion y la vovlemos mayus
                    ubicacion.textContent = data.name.toUpperCase();

                    //accedemos a la velocidad
                    let vel = data.wind.speed
                    vientoVelocidad.textContent= `${vel} M/S`

                    //mostrar iconos ********************************************************

                    //estaticos
                    //console.log(data.weather[0].icon); 
                    /*
                    
                    let iconCode = data.weather[0].icon //traemos el codigo del icono del api
                    const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`
                    iconoAnimado.src = urlIcon

                    */  //traemos la imagen del icono segun el codigo extraido de la variable iconCode


                    //para iconos dinámicos

                    //buscar la manera de mostrar los iconos siendo de noche, en el momento solo funciona con los iconos de dia
                    console.log(data.weather[0].main)
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                        iconoAnimado.src='animated/thunder.svg'
                        console.log('TORMENTA');
                        break;
                        case 'Drizzle':
                        iconoAnimado.src='animated/rainy-2.svg'
                        console.log('LLOVIZNA');
                        break;
                        case 'Rain':
                        iconoAnimado.src='animated/rainy-7.svg'
                        console.log('LLUVIA');
                        break;
                        case 'Snow':
                        iconoAnimado.src='animated/snowy-6.svg'
                            console.log('NIEVE');
                        break;                        
                        case 'Clear':
                            iconoAnimado.src='animated/day.svg'
                            console.log('LIMPIO');
                        break;
                        case 'Atmosphere':
                        iconoAnimado.src='animated/weather.svg'
                            console.log('ATMOSFERA');
                            break;  
                        case 'Clouds':
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            console.log('NUBES');
                            break;  
                        default:
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('por defecto');
                    }
                    
                
                
                
                
                }) 
                .catch(error => {
                    console.log(error) //imprime el error dado el caso que suceda
                })

        })
          
    }

})