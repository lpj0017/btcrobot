function _onStrategyUI(strategy) {
  var buyThreshold = document.getElementById("divbuyThreshold");
  var sellThreshold = document.getElementById("divsellThreshold");
  var signalPeriod = document.getElementById("divsignalPeriod");
  var MACDbuyThreshold = document.getElementById("divMACDbuyThreshold");
  var MACDsellThreshold = document.getElementById("divMACDsellThreshold");
  var emaid = document.getElementById("divema");
  var kdjid = document.getElementById("divkdj");
  console.log(strategy);

  if (strategy != "EMA") {
    signalPeriod.style.display = "block";
    MACDbuyThreshold.style.display = "block";
    MACDsellThreshold.style.display = "block";
  } else {
    signalPeriod.style.display = "none";
    MACDbuyThreshold.style.display = "none";
    MACDsellThreshold.style.display = "none";
  }


  if (strategy == "MACD") {
    buyThreshold.style.display = "none";
    sellThreshold.style.display = "none";
  } else {
    buyThreshold.style.display = "block";
    sellThreshold.style.display = "block";
  }

  if (strategy == "EMAMACD") {
    MACDbuyThreshold.style.display = "none";
    sellThreshold.style.display = "none";
  }

  if (strategy == "KDJ" || strategy == "KDJ-EX" || strategy == "KDJ-XC") {
    emaid.style.display = "none";
    kdjid.style.display = "block"
  } else {
    emaid.style.display = "block";
    kdjid.style.display = "none";
  }

  if (strategy == "OPENORDER") {
    emaid.style.display = "none";
    kdjid.style.display = "none";
  }
}

function onStrategyUI() {
  var strategyID = document.getElementById("strategy");
  var strategy = strategyID.value
  _onStrategyUI(strategy)
}

$(function() {
  $.getJSON('/engine', function(data) {
    console.log(data)

    if (data.disable_trading == "0") {
      console.log("0")
      $('#disable_trading').prop('checked', false);
    } else {
       console.log("1")
      $('#disable_trading').prop('checked', true);
    }

    if (data.disable_email == "0") {
      $('#disable_email').prop('checked', false);
    } else {
      $('#disable_email').prop('checked', true);
    }

    $('#to_email').val(data.to_email);

    $('#datacenter').val(data.datacenter);
    $('#tradecenter').val(data.tradecenter);
    $('#symbol').val(data.symbol);
    $('#tick_interval').val(data.tick_interval);


    var strategy = data.strategy

    $('#strategy').val(strategy);

    _onStrategyUI(strategy)

    $('#totalHour').val(data.totalHour);
    $('#tradeAmount').val(data.tradeAmount);
    $('#slippage').val(data.slippage);
    $('#stoploss').val(data.stoploss);
    $('#takeprofit').val(data.takeprofit);
    $('#k').val(data.k);
    $('#d').val(data.d);
    $('#j').val(data.j);
    $('#shortEMA').val(data.shortEMA);
    $('#longEMA').val(data.longEMA);
    $('#signalPeriod').val(data.signalPeriod);
    $('#buyThreshold').val(data.buyThreshold);
    $('#sellThreshold').val(data.sellThreshold);
    $('#MACDbuyThreshold').val(data.MACDbuyThreshold);
    $('#MACDsellThreshold').val(data.MACDsellThreshold);

    // Switch
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

    // Custom Selects
    $("select[name='datacenter']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='tradecenter']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='symbol']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='strategy']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='tick_interval']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
  });

  // 表单提交
  $('#update_conf').submit(function() {
    var self = $(this);
    $.post(self.attr('action'), self.serialize(), function(data) {
      alert(data.msg);
      location.reload();
    });
    return false;
  });
})
