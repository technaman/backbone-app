var User = Backbone.Model.extend({
    initialize: function(){
    }
});

var Post = Backbone.Model.extend({
    initialize: function(){
    }
});

var Picture = Backbone.Model.extend({
    initialize: function(){
    }
});

var Users = Backbone.Collection.extend({
    model: User,
    url: "https://jsonplaceholder.typicode.com/users"
});

var users = new Users();
users.fetch();

var Posts = Backbone.Collection.extend({
    model: Post,
    url: "https://jsonplaceholder.typicode.com/posts"
});

var posts = new Posts();
posts.fetch();

var Pictures = Backbone.Collection.extend({
    model: Picture,
    url: "https://picsum.photos/v2/list"
});

var images = new Pictures();
images.fetch();

// Views //


var UserView = Backbone.View.extend({
    el: "#app-container",
    collection: users,
    template: _.template($("#user-template").html()),
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html(this.template(
            {
                collection: this.collection.toJSON()
            }
        ));
    }
});

var PostView = Backbone.View.extend({
    el:"#app-container",
    template: _.template($("#post-template").html()),
    collection: posts,
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html(this.template(
            {
                posts: this.collection.toJSON()
            }
        ));
    }
});

var ImageView = Backbone.View.extend({
    el:"#app-container",
    template: _.template($("#image-template").html()),
    collection: images,
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html(this.template({
            images: this.collection.toJSON()
        }));        
    }
});

// Routes //

var Router = Backbone.Router.extend({
    routes:{
       "users(/:userId)":"ShowUsers",
       "posts(/:postId)":"ShowPosts",
       "images(/:imageId)":"ShowGallery",
       "": "ShowGallery"
    },
    ShowUsers: function(userId){
        var view_users = new UserView();
    },
    ShowPosts: function(postId){
        var view_posts = new PostView();
    },
    ShowGallery: function(imageId){
        var view_gallery = new ImageView();
    }
});

var routerObj = new Router();

Backbone.history.start();