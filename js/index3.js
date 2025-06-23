var dialogs = [
	{
	  index: 0,
	  content: "🌺Estás oficialmente invitad@ a mi fiesta de cumpleaños al estilo *Lilo y Stitch* 🏝️🎉",
	  costume: 1,
	},
	{
	  index: 1,
	  content: "✨ ¡VIRGINIA BENEDITH te espera con collares de flores, bebidas piñatas y mucha buena vibra! 🍹🌈",
	  costume: 2,
	},
	{
	  index: 2,
	  content: "👗 Ponte tu mejor look playero: camisas hawaianas, faldas de hojas, lentes de sol y actitud relajada 😎🌴",
	  costume: 1,
	},
	{
	  index: 3,
	  content: "📅 Nos vemos el 6 de julio a las 3:30 PM en Colegio Calasanz León, 4C al norte, media abajo 📍🏠",
	  costume: 2,
	},
	{
	  index: 4,
	  content: "🔊 ¡Prepárate! Porque estará Karol G, Kari León, Grupo Firme y muchos más... en la bocina claro 😂🎶",
	  costume: 1,
	},
	{
	  index: 5,
	  content: "📨 Recuerda!!! Si no llegas, NUNCA TE LO VOY A PERDONAR!! 😂😎",
	  costume: 2,
	},
	{
	  index: 6,
	  content: "📨 En el siguiente enlace encontrarás la invitación completa y podrás confirmar tu asistencia 🌐👇",
	  costume: 2,
	},
  ];
  
  var nextIndex = 0;
  var musicPlaying = false;
  
  var showText = function (target, message, index, interval, enableButton) {
	if (index < message.length) {
	  $(target).append(message[index++]);
	  setTimeout(function () {
		showText(target, message, index, interval, enableButton);
	  }, interval);
	} else {
	  if (enableButton) {
		$("#dialog-btn").prop("disabled", false);
		$("#dialog-ubi").hide(); // Ocultar botón de ubicación en pasos intermedios
	  } else {
		$("#dialog-btn")
		  .prop("disabled", false)
		  .html("¡Asistencia!")
		  .off("click")
		  .on("click", function () {
			window.open("https://forms.gle/YwncrEvVXXhS1DDHA", "_blank");
		  });
  
		$("#dialog-ubi").show(); // Mostrar botón de ubicación solo al final
		startConfetti();
	  }
	}
  };
  
  var isLast = function () {
	return nextIndex === dialogs.length;
  };
  
  var resetCostumes = function () {
	var stitch = $("#stitch-character");
	stitch.removeClass("stitch-costume-1");
	stitch.removeClass("stitch-costume-2");
  };
  
  $(window).on("load", function () {
	$("#loader").hide();
  
	var stitch = $("#stitch-character");
	stitch.addClass("can-jump");
  
	var dialogButton = $("#dialog-btn");
	var locationButton = $("#dialog-ubi");
	var song = $("#song")[0];
  
	dialogButton.prop("disabled", false);
	dialogButton.click(function (event) {
	  event.preventDefault();
  
	  // Reproducir música solo la primera vez que se hace click
	  if (!musicPlaying) {
		song.play();
		musicPlaying = true;
		$("#music-button i").addClass("fa-beat-fade");
	  }
  
	  var nextDialog = dialogs.find((dialog) => dialog.index === nextIndex);
	  if (nextDialog != null) {
		nextIndex++;
  
		if (nextIndex > dialogs.length) {
		  nextIndex = 0;
		}
  
		// Cambiar vestuario
		resetCostumes();
		stitch.addClass("stitch-costume-" + nextDialog.costume);
		stitch.addClass("jump");
		setTimeout(function () {
		  stitch.removeClass("jump");
		}, 100);
  
		// Mostrar texto
		dialogButton.prop("disabled", true);
		$("#dialog-content").html("");
		showText("#dialog-content", nextDialog.content, 0, 40, !isLast());
	  }
	});
  
	// Botón de música (opcional)
	var musicButton = $("#music-button");
	musicButton.click(function (event) {
	  event.preventDefault();
	  if (musicPlaying) {
		musicButton.children("i").removeClass("fa-beat-fade");
		song.pause();
	  } else {
		musicButton.children("i").addClass("fa-beat-fade");
		song.play();
	  }
	  musicPlaying = !musicPlaying;
	});
  
	// Detener música al cerrar la página
	$(window).on("beforeunload", function () {
	  if (musicPlaying) {
		song.pause();
		song.currentTime = 0;
	  }
	});
  });
  