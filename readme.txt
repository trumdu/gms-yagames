Почти все функции работают по логике:
- вызываем событие (показ рекламы к примеру Games_showFullscreenAdv(); ).
- функция вернет ID запроса
- ответ придет в событии "Async - Social"
- можно сравнить ID запроса с полученным или ориентироваться на тип события
- парсим ответ через async_load[? "event"] 
Игру можно загрузить в черновик на Яндекс играх и потом появиться тестовая ссылка.
SDK не работает вне Яндекс игр и будет возвращать ошибку.

Провести тест: https://yandex.ru/games/app/179241?draft=true&lang=ru
