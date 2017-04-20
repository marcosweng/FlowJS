var Flow = (function() {
    var FlowObj = function() {},
        parseArgs = function(args) {
            if (args.length === 0) {
                //抛出异常
                throw "action is undefined";
            }
            if (args.length === 1) {
                //判断是否为函数
                if (typeof args[0] === "function") {
                    return {
                        "action": args[0]
                    }
                } else if (typeof args[0] === "object") {
                    return args[0]
                }
            } else {
            	if (typeof args[0] !== "function") {
					//抛出异常
	                throw "action is not a function";
            	}
                return {
                    "action": args[0],
                    "ack": args[1],
                    "fail": args[2]
                }
            }
        };

    /**
     * @param  {[context]} 
     * 	流程配置：
     * 		{
     * 			"data":需要传输的数据
     * 			"预留扩展其他配置选项"
     * 		}
     * @return {[type]}
     */
    FlowObj.prototype.of = function(context) {
        this.data = context ? context.data : undefinedl
        this.actions = [];
        this.step = -1;
        return this;
    };

    /**
     * @param  action
     * 	两种类型：
     * 		arguments->只包含了action内容，即多个函数
     * 			actionFunction,ackFunction,failFunction
     * 		object-> 一个config,结构如下：
     * 		{
     * 			"action":function(){},
     * 			"ack":function(data),
     * 			"fail":function(data,e)
     * 		}
     *
     * 		
     * @return {[type]}
     */
    FlowObj.prototype.next = function() {
    	var config = parseArgs(arguments);
        this.actions.push(config);
        return this;
    };

    FlowObj.prototype.prev = function() {
    	
        this.actions.splice(this.actions.length, 0, action);
        return this;
    };

    FlowObj.prototype.done = function() {
        for (var i = 0; i <= this.actions.length; i++) {
            actions[i].
        }
    };

    return FlowObj;
})();