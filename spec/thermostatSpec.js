'use strict';
describe('Thermostat', function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('goes up by 1 degree', function() {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('goes down by 1 degree', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it('has a minimum of 10 degrees', function() {
    for (var i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('PSM is on', function() {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('PSM is off', function() {
    thermostat.switchOffPowerSavingMode();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch PSM back on', function() {
    thermostat.switchOffPowerSavingMode();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchOnPowerSavingMode();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('upper temp limit if PSM is On', function() {
    thermostat.switchOnPowerSavingMode();
    for (var i = 0; i < 6; i++) {
      thermostat.up();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(25);
  });

  it('upper temp limit if PSM is On', function() {
    thermostat.switchOffPowerSavingMode();
    for (var i = 0; i < 13; i++) {
      thermostat.up();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(32);
  });

  it('reset temperature', function() {

    for (var i = 0; i < 5; i++) {
      thermostat.up();
    }
      thermostat.resetTemp();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('it is considered low-usage', function() {
        for (var i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
  it('it is considered medium-usage when temp is between 18-25', function() {
    expect(thermostat.energyUsage()).toEqual('medium-usage');
  });
  it('it is considered high-usage > 25', function() {
        for (var i = 0; i < 8; i++) {
          thermostat.switchOffPowerSavingMode();
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });



  });
