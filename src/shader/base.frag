varying vec3 vPosition;
varying vec3 vModifiedNormal;
const float PI = 3.14159265358979323846264;
const vec3 eye = vec3(0.0, 0.0, 20.0);
const vec3 lgt = normalize(vec3(1.0, 1.0, 0.5));
void main() {
    float u = (atan(vModifiedNormal.z, vModifiedNormal.x) + PI) / (PI * 2.0);
    float v = (vModifiedNormal.y + 1.0) * 0.5;
    vec2 uv = vec2(fract(u - 0.25), v);
    float l = max(dot(reflect(normalize(vPosition - eye), vModifiedNormal), lgt), 0.0);
    l = smoothstep(0.75, 0.9, l * l * l) * 0.5;
    gl_FragColor = vec4(vec3(l), 1.0);
}
