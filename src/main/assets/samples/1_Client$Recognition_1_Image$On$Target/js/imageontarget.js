var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ClientTracker needs to be created in order to start the recognition engine.
			It is initialized with a URL specific to the target collection. Optional parameters are
			passed as object in the last argument. In this case a callback function for the onLoaded
			trigger is set. Once the tracker is fully loaded the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to
			respond to any or a certain group of targets.
		*/
		this.tracker = new AR.ClientTracker("assets/escapemuseum.wtc", {
			onLoaded: this.worldLoaded
		});

		/*
			The next step is to create the augmentation. In this example an image resource is
			created and passed to the AR.ImageDrawable. A drawable is a visual component that can
			be connected to an IR target (AR.Trackable2DObject) or a geolocated object
			(AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size.
			Optional parameters allow for position it relative to the recognized target.
		*/

		/* Create overlay for page one */
		var imgOne = new AR.ImageResource("assets/znacznik.png");
		var overlayOne = new AR.ImageDrawable(imgOne, 1, {
			offsetX: -0.15,
			offsetY: 0,
			onClick: function() {
			    var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
                var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
                document.getElementById('myid').innerHTML = "<div" + cssDivLeft + ">Touched</div>";

                setTimeout(function() {
                    var e = document.getElementById('myid');
                	e.parentElement.removeChild(e);
                }, 1000);
			}
		});

        var poiHTMLdrawable = new AR.HtmlDrawable({
            html:this.generateLabel('Filmowy Pałac Ziemi Obiecanej', 'W stronę Scheiblerów (tom 1)<br/>' +
                                                                      'Praca zbiorowa<br/>' +
                                                                      'Wyd. Stowarzyszenie Miłośników off Kultury SmoK, Muzeum Kinematografii<br/>'+
                                                                      'Łódź 2011', 'W stronę muzeum. W stronę filmu (tom 2)')},
            1, {
                offsetX : 0.9,
                horizontalAnchor : AR.CONST.HORIZONTAL_ANCHOR.CENTER,
                opacity : 1,
                viewportWidth: 512
            });

        var notepadHTMLDrawable = new AR.HtmlDrawable({
            html: '<div id="notebookText" class="notebookText" style="width: 300px; height: 600px; background-color: black; color: white; font-size: 10px">###</div>'
            }, 1, {
                offsetX : 0.9,
                horizontalAnchor : AR.CONST.HORIZONTAL_ANCHOR.CENTER,
                opacity : 1,
                viewportWidth: 512,
                allowDocumentLocationChanges: true,
                onLoaded: function() {
                        console.log('test test test');
                        var riddle1 = new Riddle();
                        riddle1.setRiddleText('Karol Scheibler (1820-1881)<br/> swoją działalnością rozpoczął nową epokę w dziejach przemysłowej Łodzi, zapewnił jej czołowe miejsce w Europie w dziedzinie przemysłu włókienniczego. Był twórcą wielkiego imperium przemysłowego na Księżym Młynie.Dbając o rozwój przemysłu pamiętał też zawsze o łodzianach. Zarówno sam Karol Scheibler, a po jego śmierci wdowa po nim, Anna z Wernerów Scheibler, syn Karol Wilhelm, córka i zięć, Matylda i Edward Herbstowie, łożyli olbrzymie sumy na budowę potrzebnych miastu gmachów, zawsze byli pierwsi we wspieraniu wszelkiego rodzaju charytatywnych akcji. Dzięki nim powstały liczne budowle, które do dzisiaj służą znakomicie łodzianom, m. in.:'+
                        '- Pałac przy Wodnym Rynku  obecnie Muzeum Kinematografii przy pl. Zwycięstwa 2 <br/>'+
                        '- Zespół przemysłowy Centrala przy Wodnym Rynku  obecnie pl. Zwycięstwa'+
                        '- Domy robotnicze przy Wodnym Rynku  obecnie pl. Zwycięstwa'+
                        '- Przędzalnia i inne budynki przemysłowe na Księżym Młynie'+
                        '- Willa Herbstów - obecnie Muzeum Wnętrz Fabrykanckich przy ul. Przędzalnianej 72 (zobacz foto)'+
                        '- Osiedle robotnicze Księży Młyn'+
                        '- Szpital św. Anny na Księżym Młynie  ob. Szpital im. K. Jonschera przy ul. Milionowej 14'+
                        '- Elektrownia scheiblerowska przy ul.bpa W. Tymienieckiego 7 (zobacz foto)'+
                        '- Pałac przy ul. Piotrkowskiej 268  obecnie użytkowany przez Politechnikę Łódzką'+
                        '- Kamienica scheiblerowska przy ul. Piotrkowskiej 11 (róg ul. A. Próchnika)'+
                        '- Gimnazjum Męskie - obecnie III LO im. T. Kościuszki przy ul. H. Sienkiewicza'+
                        '- Szpital dziecięcy Anny Marii  obecnie Szpital Dziecięcy im. J. Korczaka przy ul. Rokicińskiej'+
                        '- Ochronka dla dzieci przy ul. Targowej 65, róg ul. Fabrycznej  obecnie siedziba wyższej uczelni'+
                        '- Kościół ewangelicki św. Jana - obecnie kościół ojców jezuitów przy ul. Sienkiewicza 60'+
                        '- Kościół ewangelicki św. Mateusza przy ul. Piotrkowskiej 279/283'+
                        '- Kościół św. Anny przy al. marsz. E. śmigłego-Rydza 24/26(zobacz foto)'+
                        '- Kościół pw. Podwyższenia Krzyża świętego na rogu ulic H. Sienkieiwcza i J. Tuwima (ołtarz główny i zwieńczenie wieży z figurami),'+
                        '- Archikatedra św. Stanisława Kostki (chór muzyczny)(zobacz foto)'+
                        '- Cerkiew św. Aleksandra Newskiego (zobacz foto)'+
                        '- Cerkiew garnizonowa św. Aleksego  obecnie kościół garnizonowy św. Jerzego przy ul. św. Jerzego'+
                        '- Kaplica-mauzoleum Karola Scheiblera na Starym Cmentarzu przy ul. Ogrodowej');
//                        riddle1.showText(notepadHTMLDrawable.html, 0);
//                        var html = notepadHTMLDrawable.html,
//                            $html = $(html),
//                            text = riddle1.getRiddleText();

////                        for(var i = 0; i < text.length; ++i) {
//                            notepadHTMLDrawable.html += text[0];
                        notepadHTMLDrawable.evalJavaScript('var text = "'+riddle1.getRiddleText()+'"; var element = document.getElementById("notebookText"); var func = function(index) {setTimeout(function() { element.innerHTML += text[index++]; func(index); }, 100); }; func(0);')

//                            var func = function(index) {
//                                setTimeout(function() {
////                                    $(".notebookText").append(text[index++]);
////                                    console.log($html);
////                                    console.log("-->" + $html.find(".notebookText").html());
////                                    notepadHTMLDrawable.html = $html.html();
//                                    func(index);
//                                }, 100);
//                            }
//                            func(0);
//                        }

                }
        });
		/*
			The last line combines everything by creating an AR.Trackable2DObject with the
			previously created tracker, the name of the image target and the drawable that should
			augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to
			respond to any target defined in the target collection. If you want to respond to a
			certain target only for a particular AR.Trackable2DObject simply provide the target
			name as specified in the target collection.
		*/
		var pageOne = new AR.Trackable2DObject(this.tracker, "muzeum-ziemia-obiecana", {
			drawables: {
				cam: [poiHTMLdrawable, notepadHTMLDrawable]
			},
			onEnterFieldOfVision: function(targetName) {
			    console.log('target name ' + targetName);
			}
		});
	},

	worldLoaded: function worldLoadedFn() {
//		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
//		var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
//		document.getElementById('loadingMessage').innerHTML =
//			"<div" + cssDivLeft + ">Scan Target &#35;1 (surfer):</div>" +
//			"<div" + cssDivRight + "><img src='assets/surfer.png'></img></div>";
//
//		// Remove Scan target message after 10 sec.
//		setTimeout(function() {
//			var e = document.getElementById('loadingMessage');
//			e.parentElement.removeChild(e);
//		}, 10000);
	},

	generateLabel: function(topString, leftString, rightString) {
	    var css = "<style>.label{text-shadow:-3px 1px 0 rgba(150,150,150,0.85);padding:.5%;margin-top:10px;margin-bottom:0;width: 500px;background-color:rgba(255,255,255,0.25);color:#fff}.label > .top{font-size:2em;padding-bottom:10px;border-bottom:2px solid #fff}.label > .main{font-size:1.3em;margin-bottom:20px;padding-left:10px;padding-right:10px}.label .left,.label .right{padding:20px 0}.label .left{border-right:2px solid #fff;float:left;width:calc(50% - 12px)}.label .right{width:50%;float:right;padding-left:10px}.clearfix{clear:both</style>";
	    var template = css+'<div class="label">'+
	                        '<div class="top">'+topString+'</div>'+
	                            '<div class="main">'+
                                       '<div class="left">'+
                                           leftString +
                                       '</div>'+
                                       '<div class="right">' +
                                           rightString +
                                       '</div>'+
                                   '</div>'+
                                   '<div class="clearfix"></div>'+
                               '</div>';
        return template;
	}


};

World.init();

$(document).ready(function() {
    $("#firstChoice, #secondChoice").bind("tap", function(event) {
        $("#inBoxCcntent").animate({
           scrollTop: $("#inBoxCcntent").height()
        });
    });

    $("#firstChoice").bind("tap", function(event) {
        $("#inBoxCcntent").append(pushText('Tekst gracza nr 1', 'user'));
        setTimeout(function(){
            $("#inBoxCcntent").append(pushText('Odpowiedz z przyszłości', 'bot'));
        }, 1000);
    });

    $("#secondChoice").bind("tap", function(event) {
        $("#inBoxCcntent").append(pushText('Tekst gracza nr 2', 'user'));
        setTimeout(function(){
            $("#inBoxCcntent").append(pushText('Odpowiedz na tekst nr 2', 'bot'));
        }, 1000);
    });

    $("div.arview").bind('tap', function(event) {
        console.log('test');
        $(".inbox").fadeOut('fast', function(){
            $("#mainBarInARView").show();
        });
    });

    $("div.arMessage").bind('tap', function(event){
        $(".inbox").fadeIn('fast');
        $("#mainBarInARView").hide();
    });

    if($(".arview").hasClass('active')) {

        function setImageOne() {
            $('.arview').fadeTo(500, 0.5, function(){
                $(this).html('<img src="assets/sms/ciemneUI_03.png" width="50%"/>');
                setImageTwo();
            });
        }

        function setImageTwo() {
            $('.arview').fadeTo(500, 1, function(){
                $(this).html('<img src="assets/sms/ciemneUI_03a.png" width="50%"/>');
                setImageOne();
            });
        }

        setImageOne();
    }

    function pushText(text, user) {
        var userClass = user == 'user' ? 'userMessage' : 'botMessage';
        return '<p class="'+userClass+'">'+text+'</p>';
    }

    $("#mainBarInARView").hide();
    $(".inbox").hide();

});
