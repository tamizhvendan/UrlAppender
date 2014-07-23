window.onload = function() {

    $("#urlSuffix").focus();

    var baseUrlInStorage;        
    
    $("#go").click(function() {

      if (!baseUrlInStorage) {
        alert("Base Url is empty. Use settings to update the Base Url");
        return;
      };

      var urlSuffix = $("#urlSuffix").val();
      var baseUrl = baseUrlInStorage;
      chrome.tabs.create({
        url : baseUrl + urlSuffix
      });
    });

    $("#save").click(function(){
      
      var baseUrl = $("#baseUrl").val();
      if (!baseUrl) {
        alert("Enter the base url");
        return;
      };

      var storage = { "baseUrl" : baseUrl }

      chrome.storage.sync.set({"storage" : storage }, function() {
        alert("Settings Saved!");
      });

      $(this).hide();
      $("#settings").show();
    });

    $("#settings").click(function () {
      $("#settingsForm").show();
      $(this).hide();
      $("#baseUrl").val(baseUrlInStorage);
    })

    $("#cancel").click(function() { 
      $("#settingsForm").hide();
    });

    $("#link").click(function() {
      chrome.tabs.create({
        url : "http://about.me/tamizhvendan"
      });
    });

    chrome.storage.sync.get("storage", function(data) {
      baseUrlInStorage = data.storage.baseUrl;
    });
}

