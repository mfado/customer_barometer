(function() {

    return {

        events: {
          'app.activated': 'init',

          'click .nav-pills .summary': 'init',
          'click .nav-pills .goodcsat': 'showGood',
          'click .nav-pills .badcsat': 'showBad'
        },

        requests: {
            getCSAT: function(email,type) {
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
          var objSummary = {};

          email="enduser01@mailinator.com";    
          var promise2 = this.promise(function(done, fail) { fail(); });

          var goodP = this.ajax('getCSAT', email, 'good'),            
              badP = this.ajax('getCSAT', email, 'bad'),
              badCommentP = this.ajax('getCSAT', email, 'badwithcomment'),
              goodCommentP = this.ajax('getCSAT', email, 'goodwithcomment');              

          this.when(goodP,badP,badCommentP,goodCommentP).then(
            function(data,data2,data3,data4) {
              objSummary.good=data[0].count;
              objSummary.bad=data2[0].count;
              objSummary.badwithcomment=data3[0].count;
              objSummary.goodwithcomment=data4[0].count;
              console.log(objSummary);
              this.showSummary(objSummary);
            }.bind(this),
            function() {
              console.log('Failure');
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
