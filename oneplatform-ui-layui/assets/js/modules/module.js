layui.config({
  version: '20180325',
  base : '../../assets/js/'
});
layui.define(['oneplatform', 'table'], function(exports){

  var $ = layui.jquery
  ,laypage = layui.laypage 
  ,layer = layui.layer 
  ,table = layui.table 
  ,element = layui.element
  oneplatform = layui.oneplatform;
  
  table.render({
    elem: '#tablecont'
    ,height: 332
    ,url: '/api/module/list'
    ,page: false //开启分页
    ,response: {
    	  statusName: 'code' 
    	  ,statusCode: 200
    	  ,dataName: 'data'
    	}
    ,cols: [[ //表头
      {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
      ,{field: 'name', title: '模块名', width:120}
      ,{field: 'serviceId', title: '模块标识', width:180, sort: true}
      ,{field: 'routeName', title: '模块路由', width:100} 
      ,{field: 'internal', title: '内部模块', width: 100,templet: '#internalTpl'}
      ,{field: 'enabled', title: '是否启用', width: 100,templet: '#enabledTpl'}
      ,{field: 'runStatus', title: '运行状态', width: 100}
      ,{fixed: 'right', width: 210, align:'center', toolbar: '#toolBar'}
    ]],
  });
  
  //监听工具条
  table.on('tool(table)', function(obj){ 
	  var data = obj.data,layEvent = obj.event; 
	  if(layEvent === 'switch'){
	      layer.confirm('确认'+(data.enabled ? '禁用' : '启用' )+'么?', function(index){
	    	    var param = {};
	    	    param.id = data.id;
	    	    param.value = !data.enabled;
		    	oneplatform.post('/api/module/switch',param,function(data){
			        layer.close(index);
			        window.location.reload();
			        oneplatform.success('操作成功');
		    	});
		       
		      });
	    }else if(layEvent === 'detail'){
	    	oneplatform.iframeDialog('模块详情','/modules/module/details.html?id='+data.id);
	    }else if(layEvent === 'del'){
	      layer.confirm('确认删除么?', function(index){
	    	oneplatform.post('/api/module/delete/'+data.id,null,function(data){
	    		obj.del(); 
		        layer.close(index);
		        oneplatform.success('删除成功');
	    	});
	       
	      });
	    }else if(layEvent === 'edit'){
	    	oneplatform.iframeDialog('编辑模块','/modules/module/edit.html?id='+data.id);
	    }
  });
  
  exports('module', null);
  
});