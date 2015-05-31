/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//Phone Gap Build
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    vibrate: function() {
      navigator.notification.vibrate( 1000 );
    }
};

//Application
var mapLoaded = false;
if (!localStorage.contadorPagina) {
    localStorage.setItem('contadorPagina', 0);
}
localStorage.setItem('contadorPagina', parseInt(localStorage.contadorPagina) + 1);
var cont = localStorage.contadorPagina;
$("#veces").append("Has visto esta página <strong>" + cont + "</strong> veces.");
function loadMap() {
	if (!mapLoaded) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
                mapLoaded = true;
            } else {
                error('No soportado');
            }
    }
	function success(position) {
    	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
        	zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: "Aquí estás!"
        });
    }
    function error(msg) {
        document.getElementById("map-canvas") = msg;
    }
}
function geolocateMe(){
		var msg = "";
        if (navigator.geolocation) {
            /* La geolocalización está disponible */
            // Obtener la posición actual
            navigator.geolocation.getCurrentPosition(funcionExito, funcionFracaso);
            
        } else {
            funcionFracaso(null);
        }
        function funcionExito(position) {
            // display current position (position.coords.latitude, position.coords.longitude).
            msg += 'Latitud: ' + position.coords.latitude + ' | ' +
                'Longitud: ' + position.coords.longitude + ' | ' +
                'Altitud: ' + position.coords.altitude + ' | ' +
                'Precisión: ' + position.coords.accuracy + ' | ' +
                'Altitud precisión: ' + position.coords.altitudeAccuracy + ' | ' +
                'Dirección: ' + position.coords.heading + ' | ' +
                'Velocidad: ' + position.coords.speed + ' | ' +
                'Tiempo: ' + new Date(position.timestamp);
            show();
        }
        function funcionFracaso(position) {
            // Notificación al usuario
            msg = "Lo siento pero la geolocalización no se soporta en tu navegador";
            show();
        }
        function show(){
            document.getElementById("coordenadas").innerHTML = msg;
        }
}