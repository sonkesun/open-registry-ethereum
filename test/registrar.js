contract('Registrar', {reset_state: true}, function(accounts) {
  it('should be possible to add registrant', function(done) {
    var registrar = Registrar.deployed();
    var data = "0x" + (Array(1025).join('af'));
    registrar.add(accounts[1], data).then(function() {
      return registrar.registrants.call(1);
    }).then(function(result) {
      assert.equal(result[1], data);
      assert.equal(result[0], accounts[1]);
    }).then(done).catch(done);
  });
  it('should be possible to add multiple registrants', function(done) {
    var registrar = Registrar.deployed();
    registrar.add(accounts[1], "").then(function() {
    }).then(function() {
      return registrar.add(accounts[2], "");
    }).then(function() {
      return registrar.getRegistrants.call();
    }).then(function(result) {
      assert.equal(result.length, 2);
    }).then(done).catch(done);
  });
  it('should allow to disable registrants');

  it('should allow to get list of active registrants', function(done) {
    var registrar = Registrar.deployed();
    registrar.add(accounts[1], "").then(function() {
    }).then(function() {
      return registrar.add(accounts[2], "");
    }).then(function() {
      return registrar.edit(accounts[2], "", false);
    }).then(function() {
      return registrar.getRegistrants.call();
    }).then(function(result) {
      assert.equal(result.length, 2);
    }).then(done).catch(done);
  });
});
