Проблема с кликами в играх.
1. Надо распаковать зип архив с игрой, открыть js файл игры
2. Найти строчку canvas.style.touchAction="none" , удалить
3. И в строке canvas.addEventListener("click",function(e){window.focus()}); - удалить window.focus()
4. Сохранить и собрать заново зип архив.