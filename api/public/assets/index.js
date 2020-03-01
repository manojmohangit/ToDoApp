jQuery(window).on("load", function() {
    var baseApiUrl = '/api/todo';
    var content = jQuery('.listToDo');
    var addTask = jQuery('input');

    addTask.keypress(function (e) {
        if (e.which == 13) {
            jQuery.ajax({
                type: 'post',
                data: { name: e.target.value },
                url: baseApiUrl,
                success: function(data) {
                    let domContent =   jQuery('<li/>')
                                .addClass('list-item')
                                .html(data.name + '<span class="remove-button" data-key='+data._id+'>X</span>')
                                .attr('id', data._id);
                    content.append(domContent);
                    addTask.val('');
                }
            });    
        }
    });
    
    jQuery(document).on("click", ".list-item", function(e) {
        let taskId = e.target.id;
        $.ajax({
            type: 'GET',
            url: baseApiUrl+"/"+taskId,
            success: function(task) {
                $.ajax({
                    type: 'PUT',
                    url: baseApiUrl+"/"+taskId,
                    data: { completed: !task.completed},
                    success: function(updatedTask) {
                        updatedTask.completed ? jQuery('#'+taskId).addClass('taskCompleted') : jQuery('#'+taskId).removeClass('taskCompleted');
                    }
                })
            }
        })
    })

    jQuery(document).on("click", ".remove-button", function(e) {
        e.stopPropagation();
        jQuery.ajax({
            type: 'DELETE',
            url: baseApiUrl+'/'+jQuery(e.target).data('key'),
            success: function(data) {
                jQuery('#'+jQuery(e.target).data('key')).remove();
            }
        })
    });

    function listToDo() {
        $.ajax({ 
            url: baseApiUrl,
            success: function(data) {
                let domContent = "";
                content.html('');
                data.forEach(element => {
                    domContent =   jQuery('<li/>')
                                    .addClass('list-item')
                                    .html(element.name + '<span class="remove-button" data-key='+element._id+'>X</span>')
                                    .attr('id', element._id);

                    element.completed ? domContent.addClass('taskCompleted') : '';
                    content.append(domContent);
                });
            }
        });
    }
    listToDo();
    
});