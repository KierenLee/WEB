data = [ { "id": "15305130530", "name": "分组一", "children": [ { "id": "1@DEFAULT", "name": "1-001" }, { "id": "2@DEFAULT", "name": "1-002" }, { "id": "5@DEFAULT", "name": "1-003" } ] }, { "id": "15305130801", "name": "分组二", "children": [ { "id": "0@DEFAULT", "name": "2-001" }, { "id": "3@DEFAULT", "name": "2-002" }, { "id": "4@DEFAULT", "name": "2-003" } ] } ]

for(let i = 0 ; i<data.length ; i++){
	$('.second-container').append(`<div class="lineTwo" id="`+data[i]['id']+`">
			<div class="tang"></div><input type="checkbox" id="" /><span class="group">`+data[i]['name']+`</span>
		</div>`)
	$("#"+data[i]['id']).append('<div class="list"><ul></ul></div>')
	$("#"+data[i]['id']).children('input:checkbox').click(function(){
		if(this.checked){
			$(this).siblings('div.list').children('ul').children('li').each(function(){
				$(this).children('input:checkbox').prop('checked',true)
			})
		}else{
			$(this).siblings('div.list').children('ul').children('li').each(function(){
				$(this).children('input:checkbox').prop('checked',false)
			})
		}
	})
	for(let j = 0 ; j<data[i]['children'].length ; j++){
		$("#"+data[i]['id']+">div>ul").append(`<li style="display:block" id="`+data[i]['children'][j]['id'].replace('@','')+`"><input style="margin-left:35px" type="checkbox"/><span class = "items">`+data[i]['children'][j]['name']+`</span></li>`)
		$("#"+data[i]['id']+">div>ul>li#"+data[i]['children'][j]['id'].replace('@','')+">input:checkbox").click(function(){
			let rootCheckbox = $(this).parents('div.list').prevAll('input:checkbox')[0],
					brothers = $(this).parents('ul').children('li').children('input:checkbox'),
					count = 0;
			for(var i = 0 ; i<brothers.length ; i++){
				if(brothers[i].checked){
					count++;
				}
			}
			if(count == brothers.length){
				rootCheckbox.checked = true;
				rootCheckbox.indeterminate = false;
			}else if(count <= brothers.length && count > 0){
				rootCheckbox.checked = false;
				rootCheckbox.indeterminate = true;
			}else{
				rootCheckbox.checked = false;
				rootCheckbox.indeterminate = false;
			}
		})
	}
}

$('.tang').click(function(){
	if($(this).css('borderColor').substr(4,1)=="("){
		$(this).css({borderColor: '#666 transparent transparent transparent'})
		$(this).next().next().next().fadeIn();
	}else{
		$(this).css({borderColor: 'transparent transparent transparent #666'})
		$(this).next().next().next().fadeOut()
	}
})

$('#search').on("input",function(e){
	var value = $(this).val();
	if(/[0-9\-]+/g.test(value)){
		$('input:checkbox').next('span.items').each(function(){
			if($(this).text().indexOf(value)>-1){
				$(this).parent().css("display","block");
			}else{
				$(this).parent().css("display","none");
			}
		})
	}else if(value == ''){
		$('input:checkbox').parent().css("display","block");
	}else{
		$('input:checkbox').next('span.group').each(function(){
			if($(this).text().indexOf(value)>-1){
				$(this).parent().css("display","block");
			}else{
				$(this).parent().css("display","none");
			}
		});		
	}
})

function showMenu(){
	$(".second-container").fadeIn();
}

function cleanAll(){
	$('input:checkbox').prop("checked",false);
}

function selectAll(){
	$('input:checkbox').prop("checked",true);
}