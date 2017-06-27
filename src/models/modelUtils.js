/*
 *  Date    : 2016.08.09
 *  Author  : CastileMan
 *  Declare : Model层通用遍历数组过Model方法
 */
"use strict";
import {List, fromJS} from 'immutable';

export const mapArrByModel = (arr = [], Model) => {
  if(!Array.isArray(arr)) { return []; }
  return arr.map((item) => {
    return Model(item);
  });
};

//遍历js对象中的数组过Model层，keyPath(Array)代表该数组在该对象中的路径
//requireImmutable为true时会返回immutable对象，否则返回js对象
export const mapArrInObjByModel = (obj = {}, keyPath = [], Model, requireImmutable = false) => {
  let Iobj = fromJS(obj);
  Iobj = Iobj.updateIn(keyPath, v => {
    if(!List.isList(v)) { return List([]); }
    return v.map((item) => {
      return fromJS(Model(item.toJS()));
    });
  });
  return requireImmutable ? Iobj : Iobj.toJS();
};

//遍历js对象或数组中的选项数据，keyPath(Array)代表该数组在该对象中的
//路径（若传过来的是要遍历的数组则路径为空数组即可）
//id, valName为数据中的对应id, value的字段名，
//如果需要“请选择”或“全部”等额外选项，请将requireExtra设为true，
//自定义额外选项内容在extraName中设置
export const mapArrInObjToOptions = (obj = {}, keyPath = [], id = "id", valName = "value", requireExtra = false, extraName = "请选择", requireImmutable = false) => {
  let Iobj = fromJS(obj);
  Iobj = Iobj.updateIn(keyPath, v => {
    if(!List.isList(v)) { return List([]); }
    let options = v.map((item) => {
      return fromJS({
        id: item.get(id) || 0,
        value: item.get(valName) || ""
      });
    });
    requireExtra && (options = options.unshift(fromJS({
      id: "",
      value: extraName
    })));
    return options;
  });
  return requireImmutable ? Iobj : Iobj.toJS();
};
