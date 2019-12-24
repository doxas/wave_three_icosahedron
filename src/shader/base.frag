/* ----------------------------------------------------------------------------
 * base texture shader
 * ---------------------------------------------------------------------------- */
precision mediump float;
uniform vec4      globalColor;
uniform sampler2D baseColorTexture;
varying vec2      vTexCoord;
void main(){
    vec4 samplerColor = texture2D(baseColorTexture, vTexCoord);
    gl_FragColor = samplerColor * globalColor;
}

