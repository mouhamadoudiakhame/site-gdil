#include <stdio.h>
int main()
{
    int m[3][3];
    float moyenne_ligne[3];
    float moyenne_colonne[3];
    float s = 0;
    
    int i, j;
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            printf("Donnez un entier : ");
            scanf("%d", &m[i][j]);
            s += m[i][j];
        } 

    }
    
    for(i = 0; i < 3; i++) {
        moyenne_ligne[i] = 0;
        for(j = 0; j < 3; j++) {
            moyenne_ligne[i] += m[i][j];
        }
        moyenne_ligne[i] = moyenne_ligne[i] / 3;
    }
    
    for(i = 0; i < 3; i++) {
        moyenne_colonne[i] = 0;
        for(j = 0; j < 3; j++) {
            moyenne_colonne[i] += m[j][i];
        }
        moyenne_colonne[i] = moyenne_colonne[i] / 3;
    }
    

    for(i = 0; i < 3; i++) {
        printf("moyenne ligne : %f\n", moyenne_ligne[i]);
    }
    
    for(i = 0; i < 3; i++) {
        printf("moyenne colonne : %f\n", moyenne_colonne[i]);
    }
    
    s = s / 9;
    printf("Moyenne globale : %f", s);
    
    return 0;
}
