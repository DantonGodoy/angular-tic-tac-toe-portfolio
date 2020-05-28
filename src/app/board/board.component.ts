import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  casinhas: any[];
  xIsNext: boolean;
  vencedor: string;

  ngOnInit(): void {
    this.novoJogo();
  }

  get jogador(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  novoJogo() {
    this.casinhas = Array(9).fill(null);
    this.xIsNext = true;
    this.vencedor = null;
  }

  fazJogada(idx: number) {
    if (!this.casinhas[idx]) {
      this.casinhas.splice(idx, 1, this.jogador);
      this.xIsNext = !this.xIsNext;
    }
    this.vencedor = this.calculaVencedor();
  }

  calculaVencedor() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.casinhas[a] &&
        this.casinhas[a] === this.casinhas[b] &&
        this.casinhas[a] === this.casinhas[c]
      ) {
        return this.casinhas[a];
      }
    }
    return null;
  }

}
