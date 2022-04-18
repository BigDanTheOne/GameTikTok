extends Control


func _init():
	var language = G.Settings.get_value("language", "language", 'en')
	if TranslationServer.get_locale() != language:
		TranslationServer.set_locale(language)

func _ready():
	get_tree().set_auto_accept_quit(false)
	G.Settings.set_value("audio", "music", false)
	G.Settings.save(G.settings_file)

func _on_Play_pressed():
	get_tree().change_scene("res://Main.tscn")

func _on_Highscores_pressed():
	get_tree().change_scene("res://Highscores.tscn")

func _on_Settings_pressed():
	get_tree().change_scene("res://Settings.tscn")

func _on_Exit_pressed():
	get_tree().quit()
