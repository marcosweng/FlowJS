var $F = (function() {
    var FlowObj = function() {},
        FlowFactory = function() {},
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
    FlowFactory.of = function(context) {
        var flow = new FlowObj();
        flow.data = context ? context.data : undefined;
        flow.actions = [];
        flow.step = -1;
        return flow;
    };



    /**
     * 执行下一步骤
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

    /**
     * [prev 执行上一步骤]
     * @return {[type]} [description]
     */
    FlowObj.prototype.prev = function() {
        if (this.actions.length < 2) {
            throw "can't not found last step,please check it!";
        }
        this.step--;
        return this;
    };

    /**
     * [done 执行操作]
     * @return {Function} [description]
     */
    FlowObj.prototype.done = function() {
    	debugger;
        var inputData = this.data;
        for (var i = 0; i < this.actions.length; i++) {
            try {
                inputData = this.actions[i].action.call(this, inputData);
                if (typeof this.actions[i].ack === "function") {
                    this.actions[i].ack.call(this, inputData);
                }
            } catch (e) {
                if (typeof this.actions[i].fail === "function") {
                    this.actions[i].fail.call(this, inputData);
                }
                break;
            }
        }
    };

    return FlowFactory;
})();