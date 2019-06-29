// component/checkGrop/checkGrop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
    },
    select: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    childlist: [],
    n: 0,
    checked: [],
    allNum: [],
  },
  
  ready() {
    var that = this; 
    var list = that.data.list;//传递过来的数据 
    // console.log(list) 
    var select = that.data.select; 
    var checked = new Array; 
    var allNum = []; 
    var aaa = []; // 检查默认选中状态 
    for (let i = 0; i < list.length; i++) { 
      for (let k = 0; k < list[i].childlist.length; k++) { 
        for (let j = 0; j < select.length; j++) { 
          if (list[i].childlist[k].id == select[j]) { 
            aaa = []; 
            // 若某条二级数组中存在多个选中的项要做判断筛选
            if (checked[i]) { 
              // check中第i项如果存过值，那么将在此项中继续加入值 
              checked[i].forEach(function (item) { 
                aaa.push(item); 
              }) 
              aaa.push(list[i].childlist[k]); 
              checked[i] = aaa; 
              } else {
               // check中第i项没有存过值，那么将值存入第i项
              if (list[i].childlist[k].istitle == "全部") { 
                for (let s = 0; s < list[i].childlist.length; s++) { 
                  list[i].childlist[s].checked = true 
                  allNum[i] = list[i].childlist.length - 1; 
                  checked[i] = [list[i]]; 
                  } 
              } else {
                checked[i] = [list[i].childlist[k]];
              }
            }
            list[i].childlist[k].checked = true;
          }
        }
      }
    }
    that.setData({
       'childlist[0]': list[0].childlist, 
       list: list, 
       checked: checked, 
       allNum: allNum, 
       }) 
       console.log(checked); 
       console.log(allNum);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ontap(e) { 
      var that = this; 
      var n = e.currentTarget.dataset.index; 
      var childlist = "childlist[" + n + "]"; 
      that.setData({ 
        [childlist]: 
        that.data.list[n].childlist, 
        n: n 
      }) 
    },
    all() {
      var that = this; 
      var n = that.data.n; 
      var childlist = "childlist[" + n + "]"; 
      var checked = "checked[" + n + "]"; 
      var allNum = "allNum[" + n + "]"; 
      var all = "";
      var checkArr = [];
      var checkboxItems = that.data.childlist[n];
      if (checkboxItems[0].checked) {
        checkboxItems[0].checked = true;
        checkArr = [];
      } else {
        checkboxItems[0].checked = false;
        checkArr.push(that.data.list[n])
        all = checkboxItems.length - 1;
      }
      checkboxItems[0].checked = !checkboxItems[0].checked
      for (let k = 1; k < checkboxItems.length; k++) {
        checkboxItems[k].checked = checkboxItems[0].checked;
      }
      console.log(checkboxItems);
      that.setData({
        [childlist]: checkboxItems,
        [checked]: checkArr,
        [allNum]: all ? all : 0,
      }, function () {
        console.log(that.data.checked);
      })
    },
    checkboxChange(e) {
      var that = this;
      var n = that.data.n;
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      var checkboxItems = that.data.childlist[n];
      var values = e.detail.value;
      var flag = "";
      var childlist = "childlist[" + n + "]";
      var checked = "checked[" + n + "]";
      var allNum = "allNum[" + n + "]";
      var checkedArr = [];
      var all = "";

      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].id == values[j]) {
            checkboxItems[i].checked = true;
            checkedArr.push(checkboxItems[i]);
            break;
          }
        }
      }
      if (values.length == checkboxItems.length - 1) {
        checkboxItems[0].checked = true;
        checkedArr = [that.data.list[n]];
        all = checkboxItems.length - 1;
      }
      this.setData({
        [childlist]: checkboxItems,
        [checked]: checkedArr,
        [allNum]: all
      });
    },
    formSubmit: function (e) {
      var that = this;
      console.log('form发生了submit事件');
      var values = that.data.checked;
      var arr = [];
      var arr1 = [];
      for (let i = 0; i < values.length; i++) {
        if (values[i] != undefined) {
          arr.push(values[i]);
        }
      }
      
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          arr1.push(arr[i][j])
        }
      }
      console.log(arr1);//选中的值
      var detail = arr1;

      this.triggerEvent("formSubmit", detail);
    },
    back() {
      this.triggerEvent("back");
    }
  } 
})
