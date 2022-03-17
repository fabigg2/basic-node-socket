$(document).ready(function () {
    var socket = io();


    socket.on('unirse', (data) => {
        $('#main').empty();
        $('#list').empty();
        $('#main').append(renderMain(data[0].sala, data.length));
        $('.cursor-ṕoiner').prop('disabled',true);
        $('.cursor-ṕoiner').css('opacity', .2)
        $('.cursor-ṕoiner').css('cursor', 'auto')
        data.forEach(({user}, index) => {
            console.log(user);
            $('#list').append(`<li class="list-group-item">#${index+1}. ${user.nombre} : ${user.telefono}</li>`)
        });

    })

    $(document).on('click', '.cursor-ṕoiner', function (e) {
        e.preventDefault();
        const text = $($($(this).children('.card-body')[0]).children()).text();
        socket.emit('unirse', { sala: text, user: JSON.parse(localStorage.getItem('usuario') )})
    });
});


function renderMain(sala, usuarios) {
    return `<div class="card-body" style="display: flex; justify-content: center; align-items: center;">
                        <h3 id="room text-center">
                            Sala: ${sala}
                        </h3>
                    </div>
                    <span class="card-footer text-center" id="ctn">
                        conetados: ${usuarios}
                    </span>
    `
}