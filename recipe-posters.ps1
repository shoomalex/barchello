Add-Type -AssemblyName System.Drawing

$assetRoot = Join-Path $PSScriptRoot '..\barcello-assets'
$recipes = @(
    @{ key='mojito'; number='02'; title='МОХИТО'; subtitle='РОМ   •   МЯТА   •   ЛАЙМ'; image='cocktail-mojito-cropped.png'; method='БИЛД'; glass='ХАЙБОЛ'; ingredients=@(@('Белый кубинский ром','45 мл'),@('Свежий сок лайма','20 мл'),@('Мята и сахар','6 вет. / 2 ч. л.'),@('Содовая','долить')); steps='Смешайте мяту с сахаром и соком лайма. Добавьте немного содовой и лёд. Влейте ром, долейте содовую и осторожно перемешайте.'; garnish='Мята и долька лайма.' },
    @{ key='negroni'; number='03'; title='НЕГРОНИ'; subtitle='ДЖИН   •   КАМПАРИ   •   ВЕРМУТ'; image='cocktail-negroni-isolated.png'; method='СТИР'; glass='ОЛД ФЭШН'; ingredients=@(@('Джин','30 мл'),@('Кампари','30 мл'),@('Красный сладкий вермут','30 мл')); steps='Налейте ингредиенты в бокал со льдом. Осторожно перемешайте до охлаждения.'; garnish='Половинка ломтика апельсина.' },
    @{ key='whiskey'; number='04'; title='ВИСКИ САУЭР'; subtitle='БУРБОН   •   ЛИМОН   •   СИРОП'; image='cocktail-whiskey-vintage.png'; method='ШЕЙК'; glass='КОББЛЕР'; ingredients=@(@('Бурбон','45 мл'),@('Сок лимона','25 мл'),@('Сахарный сироп','20 мл')); steps='Встряхните ингредиенты в шейкере со льдом. Процедите в бокал. По желанию добавьте белок перед встряхиванием.'; garnish='Апельсин и вишня.' }
)

function Color([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

foreach ($recipe in $recipes) {
    $bitmap = [System.Drawing.Bitmap]::new(1800,2700)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    function Rect([int]$x,[int]$y,[int]$w,[int]$h,[string]$color) { $b=[System.Drawing.SolidBrush]::new((Color $color)); $g.FillRectangle($b,$x,$y,$w,$h); $b.Dispose() }
    function Line([int]$x1,[int]$y1,[int]$x2,[int]$y2,[string]$color,[int]$weight=2) { $p=[System.Drawing.Pen]::new((Color $color),$weight); $g.DrawLine($p,$x1,$y1,$x2,$y2); $p.Dispose() }
    function Text([string]$value,[string]$family,[float]$size,[string]$color,[int]$x,[int]$y,[int]$w,[int]$h,[string]$align='Near',[string]$style='Regular') {
        $font=[System.Drawing.Font]::new($family,$size,[System.Drawing.FontStyle]::$style,[System.Drawing.GraphicsUnit]::Pixel)
        $brush=[System.Drawing.SolidBrush]::new((Color $color))
        $format=[System.Drawing.StringFormat]::new(); $format.Alignment=[System.Drawing.StringAlignment]::$align; $format.LineAlignment=[System.Drawing.StringAlignment]::Center
        $g.DrawString($value,$font,$brush,[System.Drawing.RectangleF]::new($x,$y,$w,$h),$format)
        $format.Dispose(); $brush.Dispose(); $font.Dispose()
    }

    Rect 0 0 1800 2700 '#E8D6B1'
    Rect 42 42 1716 2616 '#4D3023'; Rect 50 50 1700 2600 '#E8D6B1'
    Rect 84 84 1632 2532 '#4D3023'; Rect 90 90 1620 2520 '#E8D6B1'
    Text 'B A R C H E L L O' 'Georgia' 43 '#4D3023' 140 112 820 70 'Near' 'Bold'
    Text "КОЛЛЕКЦИЯ КОКТЕЙЛЕЙ   /   № $($recipe.number)" 'Arial' 31 '#805B3D' 850 120 800 60 'Far' 'Bold'
    Line 140 202 1660 202 '#9A754B' 4
    $titleSize = if ($recipe.title.Length -gt 9) { 139 } else { 178 }
    Text $recipe.title 'Georgia' $titleSize '#4D3023' 130 238 1540 215 'Center' 'Bold'
    Text $recipe.subtitle 'Arial' 34 '#9B4E32' 220 457 1360 68 'Center' 'Bold'

    Rect 130 565 1540 1060 '#201A16'
    Line 145 580 1655 580 '#C9A56D' 3; Line 145 1610 1655 1610 '#C9A56D' 3
    $image=[System.Drawing.Image]::FromFile((Join-Path $assetRoot $recipe.image))
    $maxW=930; $maxH=1000
    $factor=[Math]::Min($maxW/$image.Width,$maxH/$image.Height)
    $drawW=[int]($image.Width*$factor); $drawH=[int]($image.Height*$factor)
    $drawX=[int](900-$drawW/2); $drawY=[int](1595-$drawH)
    $g.DrawImage($image,[System.Drawing.Rectangle]::new($drawX,$drawY,$drawW,$drawH),0,0,$image.Width,$image.Height,[System.Drawing.GraphicsUnit]::Pixel)
    $image.Dispose()
    Text 'THE' 'Georgia' 40 '#D3AE70' 190 850 270 65 'Center' 'Italic'
    Text 'CLASSIC' 'Georgia' 54 '#E8D6B1' 162 920 326 82 'Center' 'Bold'
    Text 'COCKTAIL' 'Georgia' 44 '#D3AE70' 158 1000 340 70 'Center' 'Italic'
    Line 210 1090 435 1090 '#9A754B' 3
    Text "№ $($recipe.number)" 'Georgia' 74 '#E8D6B1' 1335 900 255 90 'Center' 'Bold'
    Text $recipe.glass 'Arial' 24 '#D3AE70' 1300 995 320 58 'Center' 'Bold'

    Text 'КЛАССИКА В КАЖДОМ ГЛОТКЕ' 'Georgia' 39 '#6F422D' 135 1650 1530 90 'Center' 'Italic'
    Line 140 1748 1660 1748 '#9A754B' 3
    Text 'РЕЦЕПТ НА 1 ПОРЦИЮ' 'Georgia' 65 '#4D3023' 145 1778 1050 100 'Near' 'Bold'
    Text "05 МИН  /  $($recipe.method)" 'Arial' 32 '#9B4E32' 1190 1800 460 60 'Far' 'Bold'
    Line 140 1902 1660 1902 '#A58A65' 2
    Text 'СОСТАВ' 'Arial' 31 '#9B4E32' 148 1935 650 55 'Near' 'Bold'
    Text 'ПРИГОТОВЛЕНИЕ' 'Arial' 31 '#9B4E32' 875 1935 790 55 'Near' 'Bold'
    Line 836 1930 836 2380 '#A58A65' 2

    $rowY=2010
    foreach($item in $recipe.ingredients) {
        $labelSize=if($item[0].Length -gt 19){31}else{39}
        Text $item[0] 'Georgia' $labelSize '#4D3023' 148 $rowY 555 66
        $amountSize=if($item[1].Length -gt 6){29}else{37}
        Text $item[1] 'Arial' $amountSize '#9B4E32' 645 $rowY 163 66 'Far' 'Bold'
        Line 148 ($rowY+80) 800 ($rowY+80) '#B9A37F' 2
        $rowY+=100
    }
    Text $recipe.steps 'Georgia' 37 '#4D3023' 875 2010 758 267
    Text $recipe.garnish 'Georgia' 34 '#9B4E32' 875 2300 758 72 'Near' 'Italic'

    Line 140 2430 1660 2430 '#9A754B' 3
    Text 'ИСКУССТВО ПРОСТЫХ СОЧЕТАНИЙ' 'Arial' 30 '#805B3D' 145 2460 1200 64 'Near' 'Bold'
    Text 'B.' 'Georgia' 77 '#4D3023' 1480 2440 170 90 'Far' 'Bold'
    Text "BARCHELLO  •  РЕЦЕПТ № $($recipe.number)" 'Arial' 22 '#805B3D' 145 2538 1510 42 'Center' 'Bold'

    $path=Join-Path $assetRoot "$($recipe.key)-recipe-poster.jpg"
    $encoder=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
    $parameters=[System.Drawing.Imaging.EncoderParameters]::new(1)
    $parameters.Param[0]=[System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality,[long]93)
    $bitmap.Save($path,$encoder,$parameters)
    $parameters.Dispose(); $g.Dispose(); $bitmap.Dispose()
    Write-Output $path
}
