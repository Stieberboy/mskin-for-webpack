<?php
    if( isset( $_GET["path"] ) and isset( $_GET["color"] ) ) {
        $svgFile = file_get_contents( $_GET["path"] );
        
        $indexs = new stdClass();
        $indexs->svgStart = strpos( $svgFile, 'svg' );
        $indexs->svgStartElEnd = strpos( $svgFile, '>', $indexs->svgStart );
        
        $svgBefore = substr( $svgFile, 0, $indexs->svgStartElEnd +1 );
        $svgAfter = substr( $svgFile, $indexs->svgStartElEnd +1 );
        
        $svgOutput = "\n<style>\n#sbg-warn-font{\nfill:" .$_GET["color"]. ";\n}\n</style>";
        
/*        var_dump( $svgBefore );
        var_dump( $svgAfter );*/
        
        printf( $svgBefore . $svgOutput . $svgAfter );
        
    }
?>