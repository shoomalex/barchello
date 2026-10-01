Add-Type -AssemblyName System.Drawing

$assetRoot = Join-Path $PSScriptRoot '..\barcello-assets'
$ErrorActionPreference='Stop'
$backgroundPath = Join-Path $assetRoot 'margarita-deco-background-v3.png'
$outputPath = Join-Path $assetRoot 'margarita-recipe-poster.jpg'
$bitmap = [System.Drawing.Bitmap]::new(1800,2700)
$g = [System.Drawing.Graphics]::FromImage($bitmap)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$background = [System.Drawing.Image]::FromFile($backgroundPath)
$g.DrawImage($background,[System.Drawing.Rectangle]::new(0,0,1800,2700))
$background.Dispose()

function Color([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }
function Text([string]$value,[string]$family,[float]$size,[string]$hex,[int]$x,[int]$y,[int]$w,[int]$h,[string]$align='Center',[string]$style='Regular') {
    $font = [System.Drawing.Font]::new($family,$size,[System.Drawing.FontStyle]::$style,[System.Drawing.GraphicsUnit]::Pixel)
    $brush = [System.Drawing.SolidBrush]::new((Color $hex))
    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = [System.Drawing.StringAlignment]::$align
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($value,$font,$brush,[System.Drawing.RectangleF]::new($x,$y,$w,$h),$format)
    $format.Dispose(); $brush.Dispose(); $font.Dispose()
}
function Line([int]$x1,[int]$y1,[int]$x2,[int]$y2,[string]$hex,[int]$weight=3) {
    $pen=[System.Drawing.Pen]::new((Color $hex),$weight)
    $g.DrawLine($pen,$x1,$y1,$x2,$y2)
    $pen.Dispose()
}
function MixedLine([string]$label,[string]$amount,[string]$unit,[int]$letterSize,[int]$numberSize,[string]$hex,[int]$x,[int]$y,[int]$w,[int]$h,[int]$dotCenter=0) {
    $parts=@(
        @{value=$label;size=$letterSize},
        @{value='·';size=$letterSize},
        @{value=$amount;size=$numberSize},
        @{value=$unit;size=$letterSize}
    )
    $family=[System.Drawing.FontFamily]::new('Georgia')
    $format=[System.Drawing.StringFormat]::GenericTypographic
    foreach($part in $parts) {
        $part.path=[System.Drawing.Drawing2D.GraphicsPath]::new()
        $part.path.AddString($part.value,$family,[int][System.Drawing.FontStyle]::Bold,[float]$part.size,[System.Drawing.PointF]::new(0,0),$format)
    }
    $numberHeight=$parts[2].path.GetBounds().Height
    $scale=[System.Drawing.Drawing2D.Matrix]::new()
    $scale.Scale(1,36/$numberHeight)
    $parts[2].path.Transform($scale)
    $scale.Dispose()
    $widths=@($parts | ForEach-Object { $_.path.GetBounds().Width })
    if($dotCenter -eq 0) {
        $total=$widths[0]+18+$widths[1]+18+$widths[2]+14+$widths[3]
        $dotCenter=$x+($w-$total)/2+$widths[0]+18+$widths[1]/2
    }
    $positions=@(($dotCenter - 22 - $widths[0]),($dotCenter - $widths[1]/2),($dotCenter + 22),($dotCenter + 22 + $widths[2] + 14))
    $baseline=$y+$h/2+18
    $brush=[System.Drawing.SolidBrush]::new((Color $hex))
    for($i=0;$i -lt $parts.Count;$i++) {
        $part=$parts[$i]
        $bounds=$part.path.GetBounds()
        $position=[System.Drawing.Drawing2D.Matrix]::new()
        $partY=if($i -eq 1) { $baseline-18-$bounds.Height/2 } else { $baseline-$bounds.Height }
        $position.Translate([float]($positions[$i]-$bounds.X),[float]($partY-$bounds.Y))
        $part.path.Transform($position)
        $g.FillPath($brush,$part.path)
        $position.Dispose(); $part.path.Dispose()
    }
    $brush.Dispose(); $family.Dispose()
}

$gold = '#F1BF63'
$mutedGold = '#D5A448'
$cream = '#F7DEA0'
Text 'МАРГАРИТА' 'Impact' 290 '#83511A' 96 106 1630 420
Text 'МАРГАРИТА' 'Impact' 290 $gold 82 90 1630 420
Line 235 565 806 565 $mutedGold 6
Line 994 565 1565 565 $mutedGold 6
Text '✦' 'Georgia' 104 $gold 812 485 176 160

Text 'СОСТАВ' 'Georgia' 63 $mutedGold 115 828 490 90 'Center' 'Bold'
Text '✦' 'Georgia' 69 $mutedGold 298 919 125 100
MixedLine 'ТЕКИЛА' '50' 'мл' 43 53 $cream 81 1037 558 96
Line 255 1156 465 1156 $mutedGold 4
MixedLine 'ТРИПЛ-СЕК' '20' 'мл' 43 53 $cream 72 1202 575 96
Line 255 1321 465 1321 $mutedGold 4
MixedLine 'СОК ЛАЙМА' '15' 'мл' 43 53 $cream 67 1367 585 96
Text '✦' 'Georgia' 69 $mutedGold 298 1472 125 100
Text 'ГАРНИР' 'Georgia' 61 $mutedGold 115 1572 490 92 'Center' 'Bold'
Line 167 1674 553 1674 $mutedGold 3
Text 'СОЛЯНАЯ КРОМКА' 'Georgia' 39 $cream 80 1702 560 84 'Center' 'Bold'
Text 'ПО ЖЕЛАНИЮ' 'Georgia' 42 $cream 80 1778 560 84 'Center' 'Bold'
MixedLine 'ШЕЙК' '5' 'МИН' 39 49 $mutedGold 80 1882 560 82

$logoPath=Join-Path $assetRoot 'barchello-logo-source.png'
$logoSource=[System.Drawing.Bitmap]::new($logoPath)
$logoInk=[System.Drawing.Bitmap]::new($logoSource.Width,$logoSource.Height,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for($y=0;$y -lt $logoSource.Height;$y++) {
    for($x=0;$x -lt $logoSource.Width;$x++) {
        $pixel=$logoSource.GetPixel($x,$y)
        if($pixel.A -gt 0) { $logoInk.SetPixel($x,$y,[System.Drawing.Color]::FromArgb($pixel.A,241,191,99)) }
    }
}
$logoSource.Dispose()
$g.DrawImage($logoInk,[System.Drawing.Rectangle]::new(245,1985,230,230))
$logoInk.Dispose()

$bandBrush=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(225,5,30,21))
$g.FillRectangle($bandBrush,[System.Drawing.Rectangle]::new(95,2460,1610,160))
$bandBrush.Dispose()
Line 105 2470 1695 2470 $mutedGold 3
Line 105 2610 1695 2610 $mutedGold 3
Text 'ВСТРЯХНИТЕ СО ЛЬДОМ  ·  ПРОЦЕДИТЕ В ОХЛАЖДЁННЫЙ БОКАЛ' 'Georgia' 39 $cream 142 2500 1516 90 'Center' 'Bold'
Text 'BARCHELLO  /  КОКТЕЙЛЬНАЯ КЛАССИКА' 'Georgia' 26 $cream 130 2625 1540 50 'Center' 'Bold'

$encoder=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters=[System.Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0]=[System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality,[long]94)
$bitmap.Save($outputPath,$encoder,$parameters)
$parameters.Dispose(); $g.Dispose(); $bitmap.Dispose()
Write-Output $outputPath
