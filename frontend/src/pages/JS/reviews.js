$(document).ready(function () {
  let speed = 600;
    $(".reviews").each(function () {
      var This = $(this);
      var Nums = This.find(".panel").size();
      This.find(".panel:first").addClass("PanelAct");
      This.append("<div class='control'></div>");
      This.find(".panel").not(".PanelAct").css("left", "100%");
      for (let i = 0; i < Nums; i++) {
        This.find(".control").append("<span></span>");
      }
      This.find(".control span:eq(0)").addClass("ContActive");
  
      This.find(".control span").click(Reviews);
  
      function Reviews() {
        var loc = $(this).index();
        var ActivLoc = This.find(".ContActive").index();
  
        $(this).addClass("ContActive").siblings().removeAttr("class");
  
        if (loc > ActivLoc) {
          var Dire = "100%";
          var IDire = "-100%";
        }
        if (loc < ActivLoc) {
          var Dire = "-100%";
          var IDire = "100%";
        }
  
        This.find(".panel").not(".PanelAct").css("left", Dire);
        This.find(".panel:eq(" + loc + ")")
          .animate({ left: "0" }, speed)
          .addClass("PanelAct")
          .siblings(".PanelAct")
          .removeClass("PanelAct")
          .animate({ left: IDire }, speed);
      }
    });
  });
  