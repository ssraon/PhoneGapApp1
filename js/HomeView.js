var HomeView = function(store) {
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '#byName', this.findByName);
		this.el.on('keyup', '#byId', this.findById);
    };
	
	this.render = function() {
		this.el.html(HomeView.template());
		return this;
	};
	
	this.findByName = function() {
		store.findByName($('.search-key').val(), function(employees) {
			$('.employee-list').html(HomeView.liTemplate(employees));
			if (self.iscroll) {
				console.log('Refresh iScroll');
				self.iscroll.refresh();
			} else {
				console.log('New iScroll');
				self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
			}			
		});
	};
	this.findById = function() {
$.ajax({
    type: "GET",
    url: "http://www.thomas-bayer.com/sqlrest/CUSTOMER/2",
    dataType: "XML",
    crossDomain: true,
    contentType: "application/XML; charset=utf-8",
    success: function (res) {
        alert("XML: it works!"+res);
		$('.employee-id-info').html(HomeView.idTemplate(res));
	//	alert("XML: it works!"+res.content)
    },
    error: function (res) {
        alert("JSON: not working! " + res.statusText);
    }
});		

	};	
 
    this.initialize();

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());
HomeView.idTemplate = Handlebars.compile($("#home-byId-tpl").html());
 
}
