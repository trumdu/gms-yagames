/// @description Проверка обновления разрешения экрана
if (browser_width != width || browser_height != height)
{
    width = browser_width;
    height = browser_height;
	screen_resolution_upd();
}