$(document).ready(function(){  

    site.videos.initialize();

}); 

site.videos = {
    id:"videos",
    data:site.videos_data,
    set_start:-8,
    set_end:-1,
    set_total:8,
    article_open:false,
    loading:false,
    current:0,
    sort_options:['all','tvfilm','stage'],
    sort_options_total:1, 
    sort_option:'',
    initialize : function () {


        this.render();

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });
        
    },
    render : function () {

        var thisobj = this;

        site.trace("render");   


        $('#videos a').click(function(event){
            event.preventDefault();
            var id = $(this).attr('entry_id');
            thisobj.open_article(id);
        });

        $('#load_more_videos_btn').click(function(event){
            thisobj.process_data();
        });
     
        if(site.device == "desktop") {
            $('#load_more_videos_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#fff", backgroundColor:'#2e65a9', ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('#load_more_videos_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#000", backgroundColor:'#fff', ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        //this.load_more();

        this.process_data()
        this.resize();

        site.trace("site.segments[1] = "+site.segments[1]+" site.segments[2] = "+site.segments[2]);
        if(site.segments[1] == "videos" && site.segments[2] != "") {
            TweenMax.delayedCall(1, thisobj.open_article, [site.segments[2]], this);
        }
        
    },

    process_data : function () {

        if(this.loading) return;
        this.loading = true;
        
        site.trace("process_data");

        for (var i = 0; i < this.data.length; i++) { 

            if(!this.data[i].loaded) this.data[i].loaded = false;

            var new_sort = true;
            var type = this.data[i].sort;

            for (var t = 0; t < this.sort_options.length; t++) { 
                $('#videos_sort_options').append('<div class="sort_option">Show :</div>');

                site.trace("this.sort_options[t] = "+this.sort_options[t]+" this.data[i].sort = "+this.data[i].sort);
                if(this.sort_options[t] == this.data[i].sort) new_sort = false;

            }

            if(new_sort) this.sort_options.push(this.data[i].sort)
        }

        if(this.sort_options.length > this.sort_options_total) this.build_sort_options();

        this.set_start = this.set_start + this.set_total;
        this.set_end = this.set_end + this.set_total;

        site.trace("this.set_end = "+this.set_end+" this.data.length-1 = "+this.data.length-1)
        if(this.set_end > this.data.length-1) {
            this.set_end = this.data.length-1;
            TweenMax.to($( '#load_more_videos_btn' ), .5, {opacity:0, onComplete:site.div_display, onCompleteParams:['#load_more_videos_btn','none'], overwrite:2}); 
        }

        

        this.build();
    },

    build_sort_options : function () {

        var thisobj = this;

        $('#videos_sort_options').html("");

        $('#videos_sort_options').append('<div class="sort_option">Show :</div>');

        for (var i = 0; i < this.sort_options.length; i++) { 

            $('#videos_sort_options').append('<div id="sort_option_'+this.sort_options[i]+'" btnid="'+this.sort_options[i]+'" active="false" class="sort_option">'+this.sort_options[i]+'</div>');
            $('#sort_option_'+this.sort_options[i]).click(function() {
                var active = $(this).attr('active');
                site.trace("active = "+active)
                if(active == "true") return;
                var id = $(this).attr('btnid')
                thisobj.sort(id);  
            });

            if (site.device == "desktop") {
                $('#sort_option_'+this.sort_options[i]).mouseenter(function(event) {
                    var active = $(this).attr('active');
                    site.trace("active = "+active)
                    if(active == "true") return;
                    TweenMax.to($(this), .25, { color: "#2e65a9", ease: "Power1.easeInOut", overwrite: 2 });
                });

                $('#sort_option_'+this.sort_options[i]).mouseleave(function(event) {
                    var active = $(this).attr('active');
                    site.trace("active = "+active)
                    if(active == "true") return;
                    TweenMax.to($(this), .25, { color: "#fff", ease: "Power1.easeInOut", overwrite: 2 });
                });
            }

        }

    },
    sort : function (val) {
        site.trace("sort val = "+val);

        if(val == "") val = "all";

        var delay = .3;

        for (var i = 0; i < this.data.length; i++) { 

            site.trace("this.data[i].type = "+this.data[i].sort+" val = "+val+" i = "+i+" this.data[i].id = "+this.data[i].id+" this.data[i].loaded = "+this.data[i].loaded)

            if(val == "all" || this.data[i].sort == val) {
                if(this.data[i].loaded) TweenMax.to($('#'+this.data[i].id), .25, { delay:delay, opacity: 1, onStart:site.div_display, onStartParams:["#"+this.data[i].id,"inline-block"], ease: "Power1.easeInOut", overwrite: 2 });
                //delay = delay + .25;
            } else {
                TweenMax.to($('#'+this.data[i].id), .25, { opacity: 0, onComplete:site.div_display, onCompleteParams:["#"+this.data[i].id,"none"], ease: "Power1.easeInOut", overwrite: 2 });
            }
        }

        for (var i = 0; i < this.sort_options.length; i++) { 
            if(this.sort_options[i] == val) {
                $('#sort_option_'+this.sort_options[i]).attr('active',"true");
                $('#sort_option_'+this.sort_options[i]).css({
                    "cursor":"default"
                });
                TweenMax.to($('#sort_option_'+val), .25, { color: "#2e65a9", ease: "Power1.easeInOut", overwrite: 2 });
            } else {
                $('#sort_option_'+this.sort_options[i]).attr('active',"false");
                $('#sort_option_'+this.sort_options[i]).css({
                    "cursor":"pointer"
                });
                TweenMax.to($('#sort_option_'+this.sort_options[i]), .25, { color: "#fff", ease: "Power1.easeInOut", overwrite: 2 });   
            }
        }

        this.sort_option = val;
    },


    build : function () {

        var i;
        var thisobj = this;

        for (i = 0; i < this.data.length; i++) { 
            site.trace("this.data[i].id = "+this.data[i].loaded+" i = "+i+" this.set_start = "+this.set_start+" this.set_end = "+this.set_end);
            if(i >= this.set_start && i <= this.set_end ) {
                site.trace("Hey yo")

                var new_content = new Image();  
                new_content.id = i;
                new_content.onload = function () {   

                    thisobj.thumb_loaded(this.id);

                } 
                var content_url = site.cdn+this.data[i].img['sizes']["video-thumb"];
                site.trace("content_url = "+content_url)
                $('#'+this.data[i].id).find('.videos_thumb').append('<img src="'+content_url+'">')


                new_content.src = content_url;
            }
        } 

        this.sort(this.sort_option);
        this.resize();
        this.loading = false;
    },

    thumb_loaded : function (val) {
        site.trace("thumb_loaded val = "+val+" this.data[val].id = "+this.data[val].id)
        this.data[val].loaded = true;
        site.div_display('#'+this.data[val].id, "inline-block")
        TweenMax.to($('#'+this.data[val].id), .5, {opacity:1, ease:"Power1.easeInOut", ooverwrite:2}); 
    
    },

    open_article : function (val) {
        site.trace("open_article val = "+val)

        var i;
        var thisobj = this;

        if(this.article_open) {
            
            this.close_article();
            
        } else {

            
                
            for (i = 0; i < this.data.length; i++) {
                site.trace("this.data[i].id = "+this.data[i].id)
                if(this.data[i].id == val) {
                    $('body').prepend('<div id="videos_overlay"></div>');

                    site.set_url("videos",this.data[i].id);
                    
                    
                    $('#videos_overlay').append('<div id="videos_nav"></div>');
                    $('#videos_nav').append('<div id="videos_nav_img"><img src="'+site.cdn+'/images/videos_header.png"></div>');
                    $('#videos_nav').append('<div type="right" class="videos_article_btn fa fa-arrow-circle-right" ></div>');
                    $('#videos_nav').append('<div type="close" class="videos_article_btn fa fa-times" ></div>');
                    $('#videos_nav').append('<div type="left" class="videos_article_btn fa fa-arrow-circle-left" ></div>');

                    $('.videos_article_btn').click(function(event){
                        var type = $(this).attr('type');
                        thisobj.nav(type);
                    });

                    $('#videos_overlay').append('<div id="videos_article"></div>');
                    $('#videos_article').append('<div id="videos_article_img"></div>');

                    site.trace("this.data[i].type = "+this.data[i].type)
                    if(this.data[i].type == "youtube") $('#videos_article_img').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+this.data[i].video_id+'?rel=0" frameborder="0" allowfullscreen></iframe>');

                    if(this.data[i].type == "vimeo") $('#videos_article_img').append('<iframe src="https://player.vimeo.com/video/'+this.data[i].video_id+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

                    $('#videos_article').append('<span id="videos_article_top"></span>');
                    $('#videos_article_top').append('<span class="videos_article_title">'+this.data[i].title+'</span>');

                    $('#videos_article_top').append('<div class="videos_share">Share: </div>');


                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="facebook" class="videos_share_btn"><span class="fa fa-facebook" aria-hidden="true" ></span><span class="screen-reader-text">Facebook</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="twitter" class="videos_share_btn"><span class="fa fa-twitter" aria-hidden="true" ></span><span class="screen-reader-text">Twitter</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="google" class="videos_share_btn"><span class="fa fa-google" aria-hidden="true" ></span><span class="screen-reader-text">Google</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="pinterest" class="videos_share_btn"><span class="fa fa-pinterest" aria-hidden="true" ></span><span class="screen-reader-text">Pinterest</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="tumblr" class="videos_share_btn"><span class="fa fa-tumblr" aria-hidden="true" ></span><span class="screen-reader-text">Tumblr</span></div>');

                     $('.videos_share_btn').click(function(event){
                        var type = $(this).attr('type');
                        var id = $(this).attr('entryid');
                        thisobj.share_article(type,id);
                    });
                    
                    if(site.device == "desktop") {
                        $('.videos_share_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.videos_share_btn').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }

                    
                    $('#videos_article').append('<span class="videos_article_desc">'+this.data[i].desc+'</span>');

         

                    $('#videos_article_close').click(function(event){
                        thisobj.open_article();
                        });

                    if(site.device == "desktop") {
                        $('#videos_article_close').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('#videos_article_close').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }
                           
                    this.open_overlay();
                    this.resize();

                    this.current = i;
                }
            }

            
            
        }

    },

    close_article : function () {

        site.set_url("videos");

        this.article_open = false;

        TweenMax.to($('#videos_overlay'), .5, {height:0, ease:"Power1.easeInOut", onComplete:this.reset_article, onCompleteScope:this, overwrite:2}); 
    },

    
    reset_article : function () {
        $('#videos_overlay').remove();
    },

    share_article : function (type, id) {
        
        site.trace("share_article type = "+type+" id = "+id);

        var i;
        for (i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {

                var url = "http://"+site.site_url+"/"+this.id+"/"+this.data[i].id;
                var img = this.data[i].img['sizes']['share'];
                var title = this.data[i].title;   
                var desc = this.data[i].desc;  
                site.share({type:type, id:id, url:url, img:img, title:title, desc:desc});
            }
        }

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


    open_overlay : function (val) {

        this.article_open = true;

        TweenMax.to($('#videos_overlay'), .5, {height:site.window_height(), ease:"Power1.easeInOut", overwrite:2}); 

    },


         
    resize : function () {

        site.trace("resize");

        var thisobj = this;


            
    },

      
    

};
