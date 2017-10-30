MAIN: { //ラベル
    if (documents.length == 0) { //ファイルが開いていない場合ダイアログを表示する
        var selFile = File.openDialog("処理したいファイルを選んでください。");
        if (selFile == null) {
            alert("キャンセルされました。");
            break MAIN; //キャンセルしたら処理を抜ける
        } else {
            var openFile = new File(selFile);
            app.open(openFile);
        }
    }

    var doc = app.activeDocument;
    var _layer = doc.artLayers;

    for (var i = 0, layerLength = _layer.length; i < layerLength; i++) {
        //▼ScriptListaner使用。
        var idslct = charIDToTypeID("slct");
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref1.putName(idLyr, _layer[i].name); //ここの第二引数にレイヤー数分指定。nameプロパティは必要。
        desc3.putReference(idnull, ref1);
        var idMkVs = charIDToTypeID("MkVs");
        desc3.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list1 = new ActionList();
        list1.putInteger(13);
        desc3.putList(idLyrI, list1);

        executeAction(idslct, desc3, DialogModes.NO); //レイヤーを順次選択。

        var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer"); //スマートオブジェクトに変換。
        executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
    }
    activeDocument.save();
    alert("全てのレイヤーをスマートオブジェクトに変換し、\r\n保存しました。");
}