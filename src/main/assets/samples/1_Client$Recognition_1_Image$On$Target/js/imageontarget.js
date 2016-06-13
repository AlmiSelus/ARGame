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
		this.tracker = new AR.ClientTracker("assets/tracker.wtc", {
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

//		var poiHTMLdrawable = new AR.HtmlDrawable({html: this.generateLabel('top', 'right', 'left')}, 0.25, {
//		    viewportWidth: 512,
//            viewportHeight: 100,
//            offsetX: +0.36,
//            offsetY: 0.5,
//            scale:1,
//            updateRate: AR.HtmlDrawable.UPDATE_RATE.STATIC,
//            onClick : function() {
//                console.log('heheh');
//            },
//            onError: function() {
//                console.log("error!");
//            }
//		});

        var poiHTMLdrawable = new AR.HtmlDrawable({
            html:this.generateLabel('top', 'left', 'right')},
            1, {
                offsetX : 1,
                horizontalAnchor : AR.CONST.HORIZONTAL_ANCHOR.CENTER,
                opacity : 0.9
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
		var pageOne = new AR.Trackable2DObject(this.tracker, "*", {
			drawables: {
				cam: [poiHTMLdrawable]
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
	    var css = "<style>.label{text-shadow:-3px 1px 0 rgba(150,150,150,0.85);padding:.5%;margin-top:10px;margin-bottom:0;min-width:20%;max-width:80%;background-color:rgba(255,255,255,0.7);color:#fff}.label > .top{font-size:2em;padding-bottom:10px;border-bottom:2px solid #fff}.label > .main{font-size:1.3em;margin-bottom:20px;padding-left:10px;padding-right:10px}.label .left,.label .right{padding:20px 0}.label .left{border-right:2px solid #fff;float:left;width:calc(50% - 12px)}.label .right{width:50%;float:right;padding-left:10px}.clearfix{clear:both</style>";
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
        $("#inBoxCcntent").append(pushText('Lol wierzysz ze jestem z przyszlosci?!', 'bot'));
    });

    $("#secondChoice").bind("tap", function(event) {
        $("#inBoxCcntent").append(pushText('GEEEEEEEJ', 'user'));
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

});
