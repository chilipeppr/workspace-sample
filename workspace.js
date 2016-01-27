/* global cpdefine chilipeppr cprequire */
cprequire_test(["inline:com-chilipeppr-workspace-sample"], function(ws) {

    console.log("initting workspace");
    ws.init();
    ws.loadFlashMsg();
    $('title').html("Console Workspace");
    $('body').css('padding', '10px');

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-workspace-sample", ["chilipeppr_ready"], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-workspace-sample", // Make the id the same as the cpdefine id
        name: "Workspace / sample", // The descriptive name of your widget.
        desc: `A ChiliPeppr Workspace sample.`,
        url: "(auto fill by runme.js)", // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)", // The standalone working widget so can view it working by itself
        /**
         * Contains reference to the Console widget object.
         */
        widgetConsole: null,
        /**
         * Contains reference to the Serial Port JSON Server object.
         */
        widgetSpjs: null,
        /**
         * Contains reference to the Lua Editor widget.
         */
        widgetLuaEditor: null,
        /**
         * The workspace's init method. It loads the Console widget and then the SPJS widget.
         */
        init: function() {

            this.addBillboardToWorkspaceMenu();

        },
        /**
         * Returns the billboard HTML, CSS, and Javascript for this Workspace. The billboard
         * is used by the home page, the workspace picker, and the fork pulldown to show a
         * consistent name/image/description tag for the workspace throughout the ChiliPeppr ecosystem.
         */
        getBillboard: function() {
            var el = $('#' + this.id + '-billboard').clone();
            el.removeClass("hidden");
            el.find('.billboard-desc').text(this.desc);
            return el;
        },
        addBillboardToWorkspaceMenu: function() {
            // get copy of billboard
            var billboardEl = this.getBillboard();
            $('#' + this.id + ' .com-chilipeppr-ws-billboard').append(billboardEl);
        },
        /**
         * Load Flash Module so we can show flash messages.
         */
        loadFlashMsg: function() {
            chilipeppr.load("#com-chilipeppr-widget-flash-instance",
                "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
                function() {
                    console.log("mycallback got called after loading flash msg module");
                    cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                        //console.log("inside require of " + fm.id);
                        fm.init();
                    });
                }
            );
        },
        /**
         * Load the workspace menu.
         */
        loadWorkspaceMenu: function() {
            // Workspace Menu with Workspace Billboard
            var that = this;
            chilipeppr.load(
                "http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/",
                function() {
                    require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {

                        var el = $('#' + that.id + ' .com-chilipeppr-ws-menu .dropdown-menu-ws');
                        console.log("got callback for attachto menu for workspace for nodemcu.. attaching to el:", el);

                        pubsubviewer.attachTo(
                            el,
                            that,
                            "Workspace"
                        );
                    });
                }
            );
        },
    }
});