#include <stdio.h>
int main()
{
    int t[10];
    int i, v;
    int trouve = 0;
    int indice_v;
    
    for(i = 0; i < 10; i++) {
        printf("Donnez un entier pour T : ");
        scanf("%d", &t[i]);
    }
    
    printf("Donnez la valeur de v : ");
    scanf("%d", &v);
    for(i = 0; i < 10; i++) {
        if(t[i] == v) {
            trouve = 1;
            indice_v = i;
        }
    }
    if(trouve == 1) {
        for(i = indice_v; i < 9; i++) {
            t[i] = t[i + 1];
        }
        t[9] = 0;
    }
    for(i = 0; i < 10; i++) {
        printf("%d \n", t[i]);
    }
    return 0;
}
