(function() {

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

          /*
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
            */

            var requesterPromise = this.ajax('getGood', email, 'good'); 
            var requesterPromise2 = this.ajax('getGood', email, 'bad');              

            this.when(requesterPromise,requesterPromise2).then(function(data,data2) {
                //console.log.bind(console, requesterPromise.data);
                console.log(data);
                console.log(data[0].count,data2[0].count);
            }.bind(this));

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
