using System;

using Mindscape.LightSpeed;
using Mindscape.LightSpeed.Validation;
using Mindscape.LightSpeed.Linq;

namespace SchoolSurvey.Web.DataAccess
{
  [Serializable]
  [System.CodeDom.Compiler.GeneratedCode("LightSpeedModelGenerator", "1.0.0.0")]
  [System.ComponentModel.DataObject]
  public partial class Parent : Entity<int>
  {
    #region Relationships

    [ReverseAssociation("Parent")]
    private readonly EntityCollection<ParentResponse> _parentResponses = new EntityCollection<ParentResponse>();


    #endregion
    
    #region Properties

    [System.Diagnostics.DebuggerNonUserCode]
    public EntityCollection<ParentResponse> ParentResponses
    {
      get { return Get(_parentResponses); }
    }



    #endregion
  }


  [Serializable]
  [System.CodeDom.Compiler.GeneratedCode("LightSpeedModelGenerator", "1.0.0.0")]
  [System.ComponentModel.DataObject]
  public partial class Question : Entity<int>
  {
    #region Fields
  
    private string _title;
    private string _description;
    private string _spendUnits;
    private int _maximumSpend;

    #endregion
    
    #region Field attribute and view names
    
    /// <summary>Identifies the Title entity attribute.</summary>
    public const string TitleField = "Title";
    /// <summary>Identifies the Description entity attribute.</summary>
    public const string DescriptionField = "Description";
    /// <summary>Identifies the SpendUnits entity attribute.</summary>
    public const string SpendUnitsField = "SpendUnits";
    /// <summary>Identifies the MaximumSpend entity attribute.</summary>
    public const string MaximumSpendField = "MaximumSpend";


    #endregion
    
    #region Relationships

    [ReverseAssociation("Question")]
    private readonly EntityCollection<Response> _responses = new EntityCollection<Response>();


    #endregion
    
    #region Properties

    [System.Diagnostics.DebuggerNonUserCode]
    public EntityCollection<Response> Responses
    {
      get { return Get(_responses); }
    }


    [System.Diagnostics.DebuggerNonUserCode]
    public string Title
    {
      get { return Get(ref _title, "Title"); }
      set { Set(ref _title, value, "Title"); }
    }

    [System.Diagnostics.DebuggerNonUserCode]
    public string Description
    {
      get { return Get(ref _description, "Description"); }
      set { Set(ref _description, value, "Description"); }
    }

    [System.Diagnostics.DebuggerNonUserCode]
    public string SpendUnits
    {
      get { return Get(ref _spendUnits, "SpendUnits"); }
      set { Set(ref _spendUnits, value, "SpendUnits"); }
    }

    [System.Diagnostics.DebuggerNonUserCode]
    public int MaximumSpend
    {
      get { return Get(ref _maximumSpend, "MaximumSpend"); }
      set { Set(ref _maximumSpend, value, "MaximumSpend"); }
    }

    #endregion
  }


  [Serializable]
  [System.CodeDom.Compiler.GeneratedCode("LightSpeedModelGenerator", "1.0.0.0")]
  [System.ComponentModel.DataObject]
  public partial class Response : Entity<int>
  {
    #region Fields
  
    private string _title;
    private int _questionId;

    #endregion
    
    #region Field attribute and view names
    
    /// <summary>Identifies the Title entity attribute.</summary>
    public const string TitleField = "Title";
    /// <summary>Identifies the QuestionId entity attribute.</summary>
    public const string QuestionIdField = "QuestionId";


    #endregion
    
    #region Relationships

    [ReverseAssociation("Response")]
    private readonly EntityCollection<ParentResponse> _parentResponses = new EntityCollection<ParentResponse>();
    [ReverseAssociation("Responses")]
    private readonly EntityHolder<Question> _question = new EntityHolder<Question>();


    #endregion
    
    #region Properties

    [System.Diagnostics.DebuggerNonUserCode]
    public EntityCollection<ParentResponse> ParentResponses
    {
      get { return Get(_parentResponses); }
    }

    [System.Diagnostics.DebuggerNonUserCode]
    public Question Question
    {
      get { return Get(_question); }
      set { Set(_question, value); }
    }


    [System.Diagnostics.DebuggerNonUserCode]
    public string Title
    {
      get { return Get(ref _title, "Title"); }
      set { Set(ref _title, value, "Title"); }
    }

    /// <summary>Gets or sets the ID for the <see cref="Question" /> property.</summary>
    [System.Diagnostics.DebuggerNonUserCode]
    public int QuestionId
    {
      get { return Get(ref _questionId, "QuestionId"); }
      set { Set(ref _questionId, value, "QuestionId"); }
    }

    #endregion

  }


  [Serializable]
  [System.CodeDom.Compiler.GeneratedCode("LightSpeedModelGenerator", "1.0.0.0")]
  [System.ComponentModel.DataObject]
  public partial class ParentResponse : Entity<int>
  {
    #region Fields
  
    private int _spent;
    private int _parentId;
    private int _responseId;

    #endregion
    
    #region Field attribute and view names
    
    /// <summary>Identifies the Spent entity attribute.</summary>
    public const string SpentField = "Spent";
    /// <summary>Identifies the ParentId entity attribute.</summary>
    public const string ParentIdField = "ParentId";
    /// <summary>Identifies the ResponseId entity attribute.</summary>
    public const string ResponseIdField = "ResponseId";


    #endregion
    
    #region Relationships

    [ReverseAssociation("ParentResponses")]
    private readonly EntityHolder<Parent> _parent = new EntityHolder<Parent>();
    [ReverseAssociation("ParentResponses")]
    private readonly EntityHolder<Response> _response = new EntityHolder<Response>();


    #endregion
    
    #region Properties

    [System.Diagnostics.DebuggerNonUserCode]
    public Parent Parent
    {
      get { return Get(_parent); }
      set { Set(_parent, value); }
    }

    [System.Diagnostics.DebuggerNonUserCode]
    public Response Response
    {
      get { return Get(_response); }
      set { Set(_response, value); }
    }


    [System.Diagnostics.DebuggerNonUserCode]
    public int Spent
    {
      get { return Get(ref _spent, "Spent"); }
      set { Set(ref _spent, value, "Spent"); }
    }

    /// <summary>Gets or sets the ID for the <see cref="Parent" /> property.</summary>
    [System.Diagnostics.DebuggerNonUserCode]
    public int ParentId
    {
      get { return Get(ref _parentId, "ParentId"); }
      set { Set(ref _parentId, value, "ParentId"); }
    }

    /// <summary>Gets or sets the ID for the <see cref="Response" /> property.</summary>
    [System.Diagnostics.DebuggerNonUserCode]
    public int ResponseId
    {
      get { return Get(ref _responseId, "ResponseId"); }
      set { Set(ref _responseId, value, "ResponseId"); }
    }

    #endregion
  }




  /// <summary>
  /// Provides a strong-typed unit of work for working with the SurveyModel model.
  /// </summary>
  [System.CodeDom.Compiler.GeneratedCode("LightSpeedModelGenerator", "1.0.0.0")]
  public partial class SurveyModelUnitOfWork : Mindscape.LightSpeed.UnitOfWork
  {

    public System.Linq.IQueryable<Parent> Parents
    {
      get { return this.Query<Parent>(); }
    }
    
    public System.Linq.IQueryable<Question> Questions
    {
      get { return this.Query<Question>(); }
    }
    
    public System.Linq.IQueryable<Response> Responses
    {
      get { return this.Query<Response>(); }
    }
    
    public System.Linq.IQueryable<ParentResponse> ParentResponses
    {
      get { return this.Query<ParentResponse>(); }
    }
    
  }

}
