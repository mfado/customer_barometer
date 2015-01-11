(function() {

    var INSTALLATIONS_URI = '/api/v2/apps/installations.json',
      INSTALLATION_URI  = '/api/v2/apps/installations/%@',
      UPLOADS_URI       = '/api/v2/apps/uploads',
      INSTALL_URI       = '/apps/installations',
      STATUS_URI        = '/api/v2/apps/job_statuses/%@.json',
      APPS_URI          = '/api/v2/apps.json';    

    return {

        events: {
          'app.activated': 'init',

          'click .nav-pills .summary': 'init',
          'click .nav-pills .goodcsat': 'showGood',
          'click .nav-pills .badcsat': 'showBad'
        },

        requests: {
            getGood: function(email,type) {
                return {
                    url: '/api/v2/search.json?query=type:ticket%20satisfaction:'+type+'%20requester:'+email+'',
                    type:'GET'
                };
            }
        },

        // RENDERS

        init: function() {
          this.showSpinner(true);

          var email = this.ticket().requester().email(); 
          email="enduser01@mailinator.com";
          var objSummary = {};

          this.ajax('getGood', email, 'good')
            .done(function(data){
              objSummary.good=data.count;
            });

          this.ajax('getGood', email, 'goodwithcomment')
            .done(function(data){
              objSummary.goodwithcomment=data.count;
            });  

          this.ajax('getGood', email, 'bad')
            .done(function(data){
              objSummary.bad=data.count;
            }); 

          this.ajax('getGood', email, 'badwithcomment')
            .done(function(data){
              objSummary.badwithcomment=data.count;
              this.showSummary(objSummary);
            });                
        },   


        buildCount: function(count,type) {
          var summary = {
            type: type,
            count: count
          };      
          console.log(summary);
          this.showSummary(summary);
          
        },

        showSummary: function(data) {
          //console.log(data.count);
          this.highlightPill('summary');
          console.log(data);
          this.switchTo('summary',data);
          this.showSpinner(false);          
        },

        // helpers

        showSpinner: function(show) {
          this.$('.main').removeClass('loading');
          this.$('.loading_spinner').css('display', 'none');
          if (show) {
            this.$('.main').addClass('loading');
            this.$('.loading_spinner').css('display', 'block');
          } 
        },        

        highlightPill: function(itemClass) {
          itemClass = '.' + itemClass;

          this.$('.nav-pills li').removeClass('active');
          this.$('.nav-pills li' + itemClass).addClass('active');
        }        


    };

}());