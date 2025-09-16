import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utils/database';
import Comment from '@/models/Comment';

// GET - Listar todos os comentários
export async function GET() {
  try {
    await connectDB();
    
    const comments = await Comment.find({})
      .sort({ createdAt: -1 }) // Mais recentes primeiro
      .limit(50); // Limitar a 50 comentários
    
    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
      },
      { status: 500 }
    );
  }
}

// POST - Criar novo comentário
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, comment } = body;
    
    // Validação básica
    if (!name || !comment) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nome e comentário são obrigatórios',
        },
        { status: 400 }
      );
    }
    
    if (name.trim().length === 0 || comment.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nome e comentário não podem estar vazios',
        },
        { status: 400 }
      );
    }
    
    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nome não pode ter mais de 100 caracteres',
        },
        { status: 400 }
      );
    }
    
    if (comment.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Comentário não pode ter mais de 1000 caracteres',
        },
        { status: 400 }
      );
    }
    
    // Criar novo comentário
    const newComment = new Comment({
      name: name.trim(),
      comment: comment.trim(),
    });
    
    const savedComment = await newComment.save();
    
    return NextResponse.json(
      {
        success: true,
        data: savedComment,
        message: 'Comentário enviado com sucesso!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    
    // Tratar erros de validação do Mongoose
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Dados inválidos fornecidos',
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
      },
      { status: 500 }
    );
  }
}