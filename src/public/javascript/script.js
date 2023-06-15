const allTopMenu = document.querySelectorAll('#content nav .form-input button');

if(currentpage=='inicio'){
    const li = document.getElementById('linkInicio');
    li.classList.add('active');
} else if(currentpage=='registros'){
    const li = document.getElementById('linkRegist');
    li.classList.add('active');
} else if(currentpage=='histo'){
    const li = document.getElementById('linkHisto');
    li.classList.add('active');
} else if(currentpage=='info'){
    const li = document.getElementById('linkInfo');
    const liC = document.getElementById('btnC');
    li.classList.add('active');
    liC.classList.remove('active');
    allTopMenu.forEach(item=>{
        const btn = item;
        btn.disabled = true;
    });    
}

allTopMenu.forEach(item=>{
    const btn = item;
    item.addEventListener('click', function(){
        allTopMenu.forEach(i=> {
            i.classList.remove('active');
        })
        btn.classList.add('active');
    })
});



let flag='';
let datos_rec=[];

let lista = [
    {
        num: 5.16,
        ts: new Date(2023, 2, 9),
        id_nodo: 1
    },
    {
        num: 23,
        ts: new Date(2021, 3, 10),
        id_nodo: 2
    },
    {
        num: 11,
        ts: new Date(2020, 2, 10),
        id_nodo: 3
    },
    {
        num: 16,
        ts: new Date(2022, 2, 9),
        id_nodo: 4
    }
]

let functionBtn1 = () => {
    peticionFetch('nodo1');
    if(currentpage == 'inicio'){
        clearInterval(a);   
        a = setInterval(async function(){ peticionFetch('nodo1');}, 5000);
        currBtn='btn1';
    } else {
        clearInterval(a);
        peticionFetch('nodo1'); currBtn='btn1';
    }
}
let functionBtn2 = () => {
    peticionFetch('nodo2');
    if(currentpage == 'inicio'){
        clearInterval(a);   
        a = setInterval(async function(){ peticionFetch('nodo2');}, 5000);
        currBtn='btn2';
    } else {
        clearInterval(a);
        peticionFetch('nodo2'); currBtn='btn2';
    }
}

let functionBtn3 = () => {
    peticionFetch('nodo3');
   if(currentpage == 'inicio'){
        clearInterval(a);   
        a = setInterval(async function(){ peticionFetch('nodo3');}, 5000);
        currBtn='btn3';
    } else {
        clearInterval(a);
        peticionFetch('nodo3'); currBtn='btn3';
    }
}

let functionBtn4 = () => {
    peticionFetch('nodo4');
    if(currentpage == 'inicio'){
        clearInterval(a);   
        a = setInterval(async function(){ peticionFetch('nodo4');}, 5000);
        currBtn='btn4';
    } else {
        clearInterval(a);
        peticionFetch('nodo4'); currBtn='btn4';
    }
}

let functionBtnC = () => {
    peticionFetch('datosnodos');
    if(currentpage == 'inicio'){
        clearInterval(a);   
        a = setInterval(async function(){ peticionFetch('datosnodos');}, 5000);
        currBtn='btnC';
    } else {
        clearInterval(a);
        peticionFetch('datosnodos'); currBtn='btnC';
    }
}

let functionReload = () => {
    switch (currBtn){
        case 'btn1': functionBtn1();  break;
        case 'btn2': functionBtn2(); break;
        case 'btn3': functionBtn3(); break;
        case 'btn4': functionBtn4(); break;
        case 'btnC': functionBtnC(); break;
    }
    document.getElementById('date').value='';
    document.getElementById('hour').value=''; 
}

let functionCalendar = () => {
    let date=document.getElementById('date').value;
    let hour=document.getElementById('hour').value; 
    
    hora = hour;
    fecha = date;
    fecha = fecha.replaceAll('-',',');
    fecha = new Date(fecha);
    fecha = fecha.toLocaleDateString('es-MX',{dateStyle:'short'});
    let listAux = [];
    if (date =='' && hour ==''){
        functionReload();
    }else if(date != '' && hour != ''){
        listaFinal.forEach(element =>{
            if (element.hora >= hora && element.fecha == fecha){
                listAux.push({
                    num: element.num,
                    fecha: element.fecha,
                    hora: element.hora,                
                })
            }
        });
        document.getElementById('tablaRegistros').innerHTML=generaTablaFecha(listAux);
    } else if(hour != '' && date ==''){
        listaFinal.forEach(element =>{
            if (element.hora >= hora ){
                listAux.push({
                    num: element.num,
                    fecha: element.fecha,
                    hora: element.hora,                
                })
            }
        });
        document.getElementById('tablaRegistros').innerHTML=generaTablaFecha(listAux);
    } else if(date != '' && hour == ''){
        listaFinal.forEach(element =>{
            if (element.fecha == fecha ){
                listAux.push({
                    num: element.num,
                    fecha: element.fecha,
                    hora: element.hora,                
                })
            }
        });
        document.getElementById('tablaRegistros').innerHTML=generaTablaFecha(listAux);
    }
}


  

if (currBtn == 'btnC' ){
    peticionFetch('datosnodos')
    a = setInterval(function (){
        peticionFetch('datosnodos')
    }, 5000);
    if(currentpage!='inicio'){functionBtnC()}
} 


//CONSULTAS
function peticionFetch(cad){
    url='http://127.0.0.1:3000/'+cad;
    fetch(url,{
    method: 'GET' }).then(response=>response.json()).then(data=>{
        if(currentpage == 'inicio') { 
            most(data, currentpage);
        } else if(currentpage == 'histo'){
            most(data, currentpage);
        }else if(currentpage == 'registros') { 
            document.getElementById('tablaRegistros').innerHTML=generaTabla(data);
            document.getElementById('date').value='';
            document.getElementById('hour').value=''; 
            //datos=data;
        }
    })
}

//GRAFICAS
function most (datos, page){  
    let x=[], y=[], ids=[];
    let view = page; 
    datos_rec=datos;
    for(let item of datos){
        x.push(item.ts);
        y.push(item.num);
        ids.push(item.id_nodo);
    }
    makePlotly(x, y, ids, view);
}


function makePlotly (x, y, ids, page){
    let x1=[], x2=[], x3=[], x4=[];
    let y1=[], y2=[], y3=[], y4=[];

    for(let i=0; i<ids.length; i++){
        if (ids[i] == '63e01ef64045da1b53a0f55e'){
            x1.push(x[i]);
            y1.push(y[i]);
        }
        if (ids[i] == '63e01f344045da1b53a0f55f'){
            x2.push(x[i]);
            y2.push(y[i]);
        }
        if (ids[i] == '63e1e08000da544f855a0854'){
            x3.push(x[i]);
            y3.push(y[i]);
        }
        if (ids[i] == '63e1e08000da544f855a0855'){
            x4.push(x[i]);
            y4.push(y[i]);
        }
    }

    if(x1.length>0 && x2.length>0 && x3.length>0 && x4.length>0){
        if(page == 'inicio'){
            let traces1 = {
                x: x1,
                y: y1,
                name: "Nodo 1",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#9545b0' }
            };

            let traces2 = {
                x: x2,
                y: y2,
                name: "Nodo 2",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#fc4c81' }
            };
            let traces3 = {
                x: x3,
                y: y3,
                name: "Nodo 3",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#ff9745' }
            };
            let traces4 = {
                x: x4,
                y: y4,
                name: "Nodo 4",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#e8eb46' }
            };
        var data = [traces1, traces2, traces3, traces4];
        } else if (page == 'histo'){
            let traces1 = {
                x: y1,
                name: "Nodo 1",  
                type: "histogram",
                //opacity: 0.8,
                marker: { color: '#9545b0' }
            };

            let traces2 = {
                x: y2,
                name: "Nodo 2",
                type: "histogram",
                //opacity: 0.6,
                marker: { color: '#fc4c81' }
            };
            let traces3 = {
                x: y3,
                name: "Nodo 3",             
                type: "histogram",
                //opacity: 0.7,
                marker: { color: '#ff9745' }
            };
            let traces4 = {
                x: y4,
                name: "Nodo 4",               
                type: "histogram",
                //opacity: 0.8,
                marker: { color: '#e8eb46' }
            };
            var data = [traces1, traces2, traces3, traces4];
        }
        
    }

    if(x1.length>0 && x2.length == 0 && x3.length == 0 && x4.length ==0){
        if(page == 'inicio'){
            let traces1 = [{
                x: x1,
                y: y1,
                name: "Nodo 1",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#9545b0' }
            }];
            var data = traces1;
        } else if(page == 'histo'){
            let traces1 = [{
                x: y1,
                name: "Nodo 1",  
                type: "histogram",
                //opacity: 0.5,
                marker: { color: '#9545b0' }
            }];
            var data = traces1;           
        }
    }

    if(x2.length>0 && x1.length == 0 && x3.length == 0 && x4.length ==0){
        if(page == 'inicio'){
            let traces2 = [{
                x: x2,
                y: y2,
                name: "Nodo 2",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#fc4c81' }
            }];
            var data = traces2;
        } else if(page == 'histo'){
            let traces2 = [{
                x: y2,
                name: "Nodo 2",  
                type: "histogram",
                //opacity: 0.6,
                marker: { color: '#fc4c81' }
            }];
            var data = traces2;           
        }
    }

    if(x3.length>0 && x1.length == 0 && x2.length == 0 && x4.length ==0){
        if(page == 'inicio'){
            let traces3 = [{
                x: x3,
                y: y3,
                name: "Nodo 3",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#ff9745' }
            }];
            var data = traces3;
        }  else if(page == 'histo'){
            let traces3 = [{
                x: y3,
                name: "Nodo 3",  
                type: "histogram",
                //opacity: 0.7,
                marker: { color: '#ff9745' }
            }];
            var data = traces3;           
        }
    }

    if(x4.length>0 && x1.length == 0 && x2.length == 0 && x3.length ==0){
        if (page == 'inicio'){
            let traces4 = [{
                x: x4,
                y: y4,
                name: "Nodo 4",
                mode: 'markers',
                type: 'scatter',
                marker: { size: 12, color: '#e8eb46' }
            }];
            var data = traces4;
        } else if(page == 'histo'){
            let traces4 = [{
                x: y4,
                name: "Nodo 4",  
                type: "histogram",
                //opacity: 0.8,
                marker: { color: '#e8eb46' }
            }];
            var data = traces4;           
        }
    }
    

    if(page == 'histo'){
        let layout = {
            title: "NODOS",
            yaxis: {
                title: {
                    text: 'Conteo',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
            //range: [0, 20]
            },
            xaxis: {
                title: {
                    text: 'Valores',
                    font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                    }
                }
                // tickformat: "%d/%m/%y"
            },
            barmode: "stack",
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };
        let config = { 
            responsive: true,
        };
        Plotly.newPlot("graficas", data, layout, config);
    } else if(page == 'inicio'){
        let layout = {
            title: "NODOS",
            yaxis: {
                title: {
                    text: 'Nitronego(mg/k)',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
            //range: [0, 20]
            },
            xaxis: {
                title: {
                    text: 'Tiempo (dia-h-m-s)',
                    font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                    }
                }
                // tickformat: "%d/%m/%y"
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };     
        let config = { 
            responsive: true,
        };
        Plotly.newPlot("graficas", data, layout, config);
    }
    
}


//TABLA DE REGISTROS

function generaTabla(lista) {
    const list = [];
    //"<tr><th>Medida</th><th>Fecha</th><th>Hora</th></tr>"
    let stringTabla = "";
    for(let elem of lista){
        let date = new Date(elem.ts);
        /*console.log(date);
        let hourFull = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();*/
        let fila = "<tr> <td>";

        fila += elem.num;
        fila += "</td>"

        fila += "<td>"
        fila += date.toLocaleDateString('es-MX',{dateStyle:'short'});
        fila += "</td>"

        fila += "<td>"
        fila += date.toLocaleTimeString('en',{ timeStyle: 'short', hour12: false, timeZone: 'UTC' });
        fila += "</td>"

        fila += "</tr>"

        stringTabla += fila;
        list.push({
            num: elem.num,
            fecha: date.toLocaleDateString('es-MX',{dateStyle:'short'}),
            hora: date.toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'UTC' }),
        });
    }
    listaFinal = list;
    return stringTabla;
};

function generaTablaFecha(lista) {
    let stringTabla = "";
    for(let elem of lista){
        let fila = "<tr> <td>";

        fila += elem.num;
        fila += "</td>"

        fila += "<td>"
        fila += elem.fecha;
        fila += "</td>"

        fila += "<td>"
        fila += elem.hora;
        fila += "</td>"

        fila += "</tr>"

        stringTabla += fila;
    }
    return stringTabla;
};


 
  