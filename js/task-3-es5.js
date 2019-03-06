var sum = {
  meth: function (arg) {
    var result = 0;
    for (var i = 0; i < arg.length; i++) {
      result += arg[i];
    }
    return result;
  }
}

var mul = {
  meth: function (arg) {
    var result = 1;
    for (var i = 0; i < arg.length; i++) {
      result *= arg[i];
    }
    return result;
  }
}

function applayAll(context, arg) {
  var slice = [].slice;
  var arrayArg = slice.call(arguments, 1, arguments.length)
  return context.meth.call(context, arrayArg);
}

applayAll(sum, 1, 2, 3);
applayAll(mul, 1, 2, 3, 4);