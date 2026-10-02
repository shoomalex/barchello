Add-Type -AssemblyName System.Drawing

$assets = Join-Path $PSScriptRoot '..\barcello-assets'
$recipes = @(
    @{ key='mojito'; title='МОХИТО'; ingredients=@('БЕЛЫЙ РОМ · 45 мл','СОК ЛАЙМА · 20 мл','МЯТА И САХАР','СОДОВАЯ · ДОЛИТЬ'); garnish='МЯТА И ЛАЙМ'; method='БИЛД · 5 МИН'; instruction='РАЗОМНИТЕ МЯТУ С ЛАЙМОМ · ДОБАВЬТЕ РОМ, ЛЁД И СОДОВУ' },
    @{ key='negroni'; title='НЕГРОНИ'; ingredients=@('ДЖИН · 30 мл','КАМПАРИ · 30 мл','КРАСНЫЙ ВЕРМУТ · 30 мл'); garnish='ЛОМТИК АПЕЛЬСИНА'; method='СТИР · 5 МИН'; instruction='СОЕДИНИТЕ СО ЛЬДОМ · ПЕРЕМЕШАЙТЕ ДО ОХЛАЖДЕНИЯ' },
    @{ key='whiskey'; title='ВИСКИ САУЭР'; ingredients=@('БУРБОН · 45 мл','СОК ЛИМОНА · 25 мл','САХАРНЫЙ СИРОП · 20 мл'); garnish='АПЕЛЬСИН И ВИШНЯ'; method='ШЕЙК · 5 МИН'; instruction='ВСТРЯХНИТЕ СО ЛЬДОМ · ПРОЦЕДИТЕ В ОХЛАЖДЁННЫЙ БОКАЛ' }
)

function Color([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

foreach ($recipe in $recipes) {
    $bitmap = [System.Drawing.Bitmap]::new(1800,2700)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $background = [System.Drawing.Image]::FromFile((Join-Path $assets ($recipe.key + '-deco-background.png')))
    $graphics.DrawImage($background,[System.Drawing.Rectangle]::new(0,0,1800,2700))
    $background.Dispose()

    function Text([string]$value,[string]$family,[float]$size,[string]$hex,[int]$x,[int]$y,[int]$width,[int]$height,[string]$style='Regular') {
        $font = [System.Drawing.Font]::new($family,$size,[System.Drawing.FontStyle]::$style,[System.Drawing.GraphicsUnit]::Pixel)
        $brush = [System.Drawing.SolidBrush]::new((Color $hex))
        $format = [System.Drawing.StringFormat]::new()
        $format.Alignment = [System.Drawing.StringAlignment]::Center
        $format.LineAlignment = [System.Drawing.StringAlignment]::Center
        $graphics.DrawString($value,$font,$brush,[System.Drawing.RectangleF]::new($x,$y,$width,$height),$format)
        $format.Dispose(); $brush.Dispose(); $font.Dispose()
    }
    function PanelText([string]$value,[float]$size,[string]$hex,[int]$y,[int]$height=90) {
        $font = [System.Drawing.Font]::new('Georgia',$size,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
        while ($graphics.MeasureString($value,$font).Width -gt 500) {
            $font.Dispose()
            $size -= 1
            $font = [System.Drawing.Font]::new('Georgia',$size,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
        }
        $font.Dispose()
        Text $value 'Georgia' $size $hex 110 $y 500 $height 'Bold'
    }
    function Line([int]$x1,[int]$y1,[int]$x2,[int]$y2,[string]$hex,[int]$weight=3) {
        $pen = [System.Drawing.Pen]::new((Color $hex),$weight)
        $graphics.DrawLine($pen,$x1,$y1,$x2,$y2)
        $pen.Dispose()
    }

    $titleSize = if ($recipe.title.Length -gt 9) { 265 } else { 290 }
    Text $recipe.title 'Impact' $titleSize '#83511A' 96 106 1630 420
    Text $recipe.title 'Impact' $titleSize '#F1BF63' 82 90 1630 420
    Line 235 565 806 565 '#D5A448' 6
    Line 994 565 1565 565 '#D5A448' 6
    Text '✦' 'Georgia' 104 '#F1BF63' 812 485 176 160

    Text 'СОСТАВ' 'Georgia' 63 '#D5A448' 115 828 490 90 'Bold'
    Text '✦' 'Georgia' 69 '#D5A448' 298 919 125 100
    $rowY = 1015
    $rowHeight = if ($recipe.ingredients.Count -eq 4) { 125 } else { 150 }
    $ingredientFont = [System.Drawing.Font]::new('Georgia',44,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
    foreach ($ingredient in $recipe.ingredients) {
        $display = if ($graphics.MeasureString($ingredient,$ingredientFont).Width -gt 550) {
            $ingredient.Replace(' · ',[Environment]::NewLine)
        } else { $ingredient }
        Text $display 'Georgia' 44 '#F7DEA0' 85 $rowY 550 ($rowHeight-12) 'Bold'
        Line 250 ($rowY+$rowHeight-5) 470 ($rowY+$rowHeight-5) '#D5A448' 3
        $rowY += $rowHeight
    }
    $ingredientFont.Dispose()
    Text '✦' 'Georgia' 69 '#D5A448' 298 1535 125 80
    Text 'ГАРНИР' 'Georgia' 61 '#D5A448' 115 1610 490 90 'Bold'
    Line 167 1705 553 1705 '#D5A448' 3
    PanelText $recipe.garnish 42 '#F7DEA0' 1725 90
    PanelText $recipe.method 40 '#D5A448' 1830 82

    $logoSource = [System.Drawing.Bitmap]::new((Join-Path $assets 'barchello-logo-source.png'))
    $logoInk = [System.Drawing.Bitmap]::new($logoSource.Width,$logoSource.Height,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    for ($pixelY=0; $pixelY -lt $logoSource.Height; $pixelY++) {
        for ($pixelX=0; $pixelX -lt $logoSource.Width; $pixelX++) {
            $pixel = $logoSource.GetPixel($pixelX,$pixelY)
            if ($pixel.A -gt 0) { $logoInk.SetPixel($pixelX,$pixelY,[System.Drawing.Color]::FromArgb($pixel.A,241,191,99)) }
        }
    }
    $logoSource.Dispose()
    $graphics.DrawImage($logoInk,[System.Drawing.Rectangle]::new(265,2030,190,190))
    $logoInk.Dispose()

    $bandBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(225,5,30,21))
    $graphics.FillRectangle($bandBrush,[System.Drawing.Rectangle]::new(95,2460,1610,160))
    $bandBrush.Dispose()
    Line 105 2470 1695 2470 '#D5A448' 3
    Line 105 2610 1695 2610 '#D5A448' 3
    Text $recipe.instruction 'Georgia' 38 '#F7DEA0' 135 2490 1530 108 'Bold'
    Text 'BARCHELLO  /  КОКТЕЙЛЬНАЯ КЛАССИКА' 'Georgia' 26 '#F7DEA0' 130 2625 1540 50 'Bold'

    $output = Join-Path $assets ($recipe.key + '-deco-recipe-poster.jpg')
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
    $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
    $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality,[long]94)
    $bitmap.Save($output,$encoder,$parameters)
    $parameters.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
    Write-Output $output
}
