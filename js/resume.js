$(document).ready(function(){  

    site.resume.initialize();

}); 

site.resume = {
    id:"resume",
    data:site.resume_data,
    set_start:-10,
    set_end:-1,
    set_total:10,
    overlay_open:false,
    loading:false,
    current:0,

    initialize : function () {


        this.render();

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });
        
    },
    render : function () {

        var thisobj = this;

        site.trace(this.id+" render");   

        this.resize();
        
    },
    
    open_article : function () {
        site.trace("open_article")

        var i;
        var t;
        var n;
        var thisobj = this;

        if(this.overlay_open) {

            this.close_article();
        } else {

            
                
            for (i = 0; i < this.data.length; i++) {
                site.trace("this.data[i].id = "+this.data[i].id)
                if(i==0) {

                    $('body').prepend('<div id="resume_overlay"></div>');

                    site.set_url("resume");
                    
                    
                    $('#resume_overlay').append('<div id="resume_nav"></div>');
                    $('#resume_nav').append('<div id="resume_nav_img"><img src="'+site.cdn+'/images/resume_header.png"></div>');
                    $('#resume_nav').append('<div type="close" class="resume_article_btn fa fa-times" ></div>');

                    $('.resume_article_btn').click(function(event){
                        var type = $(this).attr('type');
                        thisobj.nav(type);
                    });

                    $('#resume_overlay').append('<div id="resume_article"></div>');

                    $('#resume_article').append('<div class="resume_article_desc"></div>');

                    for (t = 0; t < this.data[i].groups.length; t++) {

                        $('#resume_article').find('.resume_article_desc').append('<div id="resume_group_'+t+'" class="resume_group"></div>');

                        $('#resume_group_'+t).append('<div class="resume_group_title">'+this.data[i].groups[t].resume_credits_title+'</div>');

                        for (n = 0; n < this.data[i].groups[t].resume_credits.length; n++) {
                            $('#resume_group_'+t).append('<div class="resume_group_production">'+this.data[i].groups[t].resume_credits[n].resume_production+'</div>');
                            $('#resume_group_'+t).append('<div class="resume_group_role">'+this.data[i].groups[t].resume_credits[n].resume_role+'</div>');
                            $('#resume_group_'+t).append('<div class="resume_group_director">'+this.data[i].groups[t].resume_credits[n].resume_director+'</div>');
                        }

                    }
                    
                    for (t = 0; t < this.data[i].skills.length; t++) {

                        $('#resume_article').find('.resume_article_desc').append('<div id="resume_skills_group_'+t+'" class="resume_group"></div>');


                        $('#resume_skills_group_'+t).append('<div class="resume_skills_title">'+this.data[i].skills[t].resume_skills_title+'</div>');
                        $('#resume_skills_group_'+t).append('<div class="resume_skills_desc">'+this.data[i].skills[t].resume_skills_desc+'</div>');
                    }
                  

                    $('#resume_article').append('<span id="resume_article_top"></span>');
                    //$('#resume_article_top').append('<span class="resume_article_title">'+this.data[i].title+'</span>');

                    $('#resume_article_top').append('<div class="resume_share">Share: </div>');


                    $('#resume_article_top .resume_share').append('<div entryid="'+this.data[i].id+'" type="facebook" class="resume_share_btn"><span class="fa fa-facebook" aria-hidden="true" ></span><span class="screen-reader-text">Facebook</span></div>');

                    $('#resume_article_top .resume_share').append('<div entryid="'+this.data[i].id+'" type="twitter" class="resume_share_btn"><span class="fa fa-twitter" aria-hidden="true" ></span><span class="screen-reader-text">Twitter</span></div>');


                    $('#resume_article_top .resume_share').append('<div entryid="'+this.data[i].id+'" type="google" class="resume_share_btn"><span class="fa fa-google" aria-hidden="true" ></span><span class="screen-reader-text">Google</span></div>');

                    $('#resume_article_top .resume_share').append('<div entryid="'+this.data[i].id+'" type="pinterest" class="resume_share_btn"><span class="fa fa-pinterest" aria-hidden="true" ></span><span class="screen-reader-text">Pinterest</span></div>');

                    $('#resume_article_top .resume_share').append('<div entryid="'+this.data[i].id+'" type="tumblr" class="resume_share_btn"><span class="fa fa-tumblr" aria-hidden="true" ></span><span class="screen-reader-text">Tumblr</span></div>');



                     $('.resume_share_btn').click(function(event){
                        var type = $(this).attr('type');
                        var id = $(this).attr('entryid');
                        site.trace("resume_share_btn type = "+type+" id = "+id);
                        thisobj.share_article(type,id);
                    });
                    
                    if(site.device == "desktop") {
                        $('.resume_share_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#fff", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.resume_share_btn').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }
                    
                    



                    if(site.device == "desktop") {
                        $('.resume_article_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.resume_article_btn').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#fff", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }
                                    
                    this.img_loaded();                 
                    this.resize();

                    this.current = i;
                }
            }

            
            
        }

    },

    close_article : function () {

        site.set_url(this.id);

        this.overlay_open = false;

        TweenMax.to($('#resume_overlay'), .5, {height:0, ease:"Power1.easeInOut", onComplete:this.reset_article, onCompleteScope:this, overwrite:2}); 
    },

    
    reset_article : function () {
        $('#resume_overlay').remove();
    },

    nav : function (type) {
        
        var thisobj = this;

        site.trace("nav type = "+type);

        this.close_article();

        if(type == "close") return;

        if(type == "left") {
            this.new = this.current-1;
        } else {
            this.new = this.current+1;
        }
        if(this.new < 0) this.new = this.data.length-1;
        if(this.new > this.data.length-1) this.new = 0;

        TweenMax.delayedCall(.55, thisobj.open_article, [this.data[this.new].id], this);
    },

    share_article : function (type, id) {
        
        site.trace("share_article type = "+type+" id = "+id);

        var i;
        for (i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {

                var url = "http://"+site.site_url+"/"+this.id+"/"+this.data[i].id;
                var img = this.data[i].img.url;
                var title = "%23"+site.hashtag+" "+this.data[i].title;   
                var desc = this.data[i].desc;  
                site.share({type:type, id:id, url:url, img:img, title:title, desc:desc});
            }
        }

    },

    img_loaded : function (val) {

        this.overlay_open = true;

        TweenMax.to($('#resume_overlay'), .5, {height:site.window_height(), ease:"Power1.easeInOut", overwrite:2}); 

    },


         
    resize : function () {

        site.trace("resize");

        var thisobj = this;


            
    },

    

};
