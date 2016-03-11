riot.tag2('dialog-container', '<header> <div class="actions" if="{dialog.hasConnection()}"> <a href="#settings" onclick="{getInfo}" class="tooltipped" title="Get information"><i class="material-icons">info_outline</i></a> <a href="#participants" onclick="{listParticipants}" class="tooltipped" title="List participants"><i class="material-icons">people</i></a> <a href="#close" onclick="{removeDialog}" class="tooltipped" title="Close dialog"><i class="material-icons">close</i></a> </div> <div class="actions" if="{!dialog.hasConnection()}"> <a href="#chat"><i class="material-icons">star_rate</i></a> </div> <h5 class="tooltipped" title="{dialog.topic() || \'No topic is set.\'}">{dialog.name()}</h5> </header> <main name="scrollElement"> <dialog-message dialog="{dialog}" msg="{msg}" user="{user}" each="{msg, i in messages}"></dialog-message> </main> <user-input dialog="{dialog}" user="{user}"></user-input>', '', '', function(opts) {
  mixin.bottom(this);
  mixin.time(this);

  this.user = opts.user;
  this.dialog = this.user.currentDialog();
  this.currentDialog = this.dialog.id();
  this.messages = [];

  this.getInfo = function(e) {
    this.dialog.addMessage({special: 'info'});
  }.bind(this)

  this.listParticipants = function(e) {
    this.dialog.addMessage({special: 'users'});
  }.bind(this)

  this.removeDialog = function(e) {
    this.user.removeDialog(this.dialog, function(err) {
      if (err) this.dialog.addMessage({message: err[0].message});
      riot.update();
    });
  }.bind(this)

  this.removeMessage = function(e) {
    this.dialog.removeMessage(e.item);
  }.bind(this)

  this.on('update', function() {
    this.dialog = this.user.currentDialog();
    this.messages = this.dialog.messages();
    this.prevMessage = null;
    console.log(1);

    if (this.dialog.id() != this.currentDialog) {
      this.currentDialog = this.dialog.id();
      this.dialog.trigger('show');
    }
  });
}, '{ }');
